import { Test, TestingModule } from '@nestjs/testing';
import { ArticlesService } from './articles.service';

describe('Articles', () => {
  let provider: ArticlesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ArticlesService],
    }).compile();

    provider = module.get<ArticlesService>(ArticlesService);
  });

  it('should be defined', () => {
    expect(provider).toBeDefined();
  });
});
