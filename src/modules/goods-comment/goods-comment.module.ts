import { Module } from '@nestjs/common';
import { GoodsCommentController } from './goods-comment.controller';
import { GoodsCommentService } from './goods-comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodsCommentEntity } from './goods-comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GoodsCommentEntity])],
  controllers: [GoodsCommentController],
  providers: [GoodsCommentService],
})
export class GoodsCommentModule {}
