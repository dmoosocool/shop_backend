import { Test, TestingModule } from '@nestjs/testing';
import { GoodsCommentService } from './goods-comment.service';

describe('GoodsCommentService', () => {
  let service: GoodsCommentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GoodsCommentService],
    }).compile();

    service = module.get<GoodsCommentService>(GoodsCommentService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
