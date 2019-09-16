import { GoodsEntity } from 'modules/goods/goods.entity';

export class OrderDto {
  readonly goods: GoodsEntity[];
}
