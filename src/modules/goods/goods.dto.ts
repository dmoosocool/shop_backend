import { IsNotEmpty } from 'class-validator';
import { GoodsCategoryEntity } from 'modules/goods-category/goods-category.entity';

export class GoodsDto {
  @IsNotEmpty({
    message: 'title不允许为空',
  })
  readonly title: string;

  @IsNotEmpty({
    message: 'content不允许为空',
  })
  readonly content: string;

  @IsNotEmpty({
    message: 'description不允许为空',
  })
  readonly description: string;

  @IsNotEmpty({
    message: '商品必须拥有商品分类',
  })
  readonly category: GoodsCategoryEntity;
}
