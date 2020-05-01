import { Body, Controller, Delete, Get, Param, Patch, Post, Headers, HttpException, HttpStatus } from '@nestjs/common';
import { ArticlesService } from './articles.service';
import { CreateArticleDto, UpdateArticleDto } from './dto/article.dto';
import { Article } from './interfaces/article.interface';
import { JWT_HEADER_PARAM, NOT_ALLOWED_USER_MESSAGE, userCanDoAction } from '../shared/utils';

@Controller('articles')
export class ArticlesController {

  constructor(private readonly articlesService: ArticlesService) {}

  @Post()
  async create(@Body() createArticleDto: CreateArticleDto) {
    await this.articlesService.create(createArticleDto);
  }

  @Get()
  async findAll(): Promise<Article[]> {
    return this.articlesService.findAll();
  }

  @Patch('/:id')
  async update(@Body() updateArticleDto: UpdateArticleDto,
               @Param('id') id,
               @Headers(JWT_HEADER_PARAM) token) {
    const article = await this.articlesService.getArticle(id);
    if(userCanDoAction(token, article.author)){
      return await this.articlesService.update(updateArticleDto, id);
    }
    throw new HttpException(NOT_ALLOWED_USER_MESSAGE, HttpStatus.FORBIDDEN);
  }

  @Delete('/:id')
  async delete(@Param('id') id) {
    await this.articlesService.delete(id);
  }

}
