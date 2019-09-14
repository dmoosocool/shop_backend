import { Test, TestingModule } from '@nestjs/testing';
import { GoodsCommentController } from './goods-comment.controller';

describe('GoodsComment Controller', () => {
  let controller: GoodsCommentController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GoodsCommentController],
    }).compile();

    controller = module.get<GoodsCommentController>(GoodsCommentController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
