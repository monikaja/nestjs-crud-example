import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { CreateArticleDto, UpdateArticleDto } from './dto/article.dto';
import { Article } from './interfaces/article.interface';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class ArticlesService {
  constructor(@InjectModel('Article') private readonly articleModel: Model<Article>
  ) {}

  async create(createArticleDto: CreateArticleDto): Promise<Article> {
    try {
      const createdArticle = new this.articleModel({
        title: createArticleDto.title,
        description: createArticleDto.description,
        body: createArticleDto.body,
        author: createArticleDto.author,
        createdAt: new Date().getTime(),
      });
      return await createdArticle.save();
    } catch (error) {
      throw new HttpException('Error creating article', HttpStatus.BAD_REQUEST);
    }
  }

  async update(updateArticleDto: UpdateArticleDto, id: string): Promise<Article> {
    try {
      const article = await this.findArticle(id);
      article.title = updateArticleDto.title;
      article.body = updateArticleDto.body;
      article.description = updateArticleDto.description;
      return await article.save();
    } catch (error) {
      throw new HttpException('Error updating article', HttpStatus.BAD_REQUEST);
    }
  }

  async delete(id: string): Promise<any> {
    try {
      return this.articleModel.deleteOne({ "_id": id });
    } catch (error) {
      throw new HttpException('Error deleting article', HttpStatus.BAD_REQUEST);
    }
  }

  async findArticle(id: string): Promise<Article> {
    let article;
    try {
      article = await this.articleModel.findById(id).exec();
      return article || null;
    } catch (error) {
      return null;
    }
  }

  async getArticle(articleId: string) {
    const article = await this.findArticle(articleId);
    if (!article) {
      throw new NotFoundException('Could not find article.');
    }
    return article;
  }

  async findAll(): Promise<Article[]> {
    return this.articleModel.find().select({__v: 0}).exec();
  }
}
