import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { GoodsEntity } from 'modules/goods/goods.entity';

@Entity('goods_category')
export class GoodsCategoryEntity {
  @PrimaryGeneratedColumn('uuid', {
    comment: '商品分类id',
  })
  id: string;

  @Column({
    comment: '分类名称',
  })
  name: string;

  @Column({
    comment: '分类名称别名',
  })
  alias: string;

  @OneToMany(type => GoodsEntity, goods => goods.category)
  goods: GoodsEntity[];
}
