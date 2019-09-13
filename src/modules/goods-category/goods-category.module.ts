import { Module } from '@nestjs/common';
import { GoodsCategoryController } from './goods-category.controller';
import { GoodsCategoryService } from './goods-category.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodsCategoryEntity } from './goods-category.entity';

@Module({
  imports: [TypeOrmModule.forFeature([GoodsCategoryEntity])],
  controllers: [GoodsCategoryController],
  providers: [GoodsCategoryService],
})
export class GoodsCategoryModule {}
