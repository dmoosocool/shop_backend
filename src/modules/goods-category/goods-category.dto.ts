import { IsNotEmpty } from 'class-validator';

export class GoodsCategoryDto {
  @IsNotEmpty({
    message: '商品别名不允许为空.',
  })
  readonly name: string;
  readonly alias: string;
}
