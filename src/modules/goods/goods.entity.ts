import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
} from 'typeorm';
import { GoodsCategoryEntity } from 'modules/goods-category/goods-category.entity';
import { GoodsCommentEntity } from 'modules/goods-comment/goods-comment.entity';

@Entity('goods')
export class GoodsEntity {
  @PrimaryGeneratedColumn('uuid', {
    comment: '商品id',
  })
  id: string;

  @CreateDateColumn({
    comment: '创建时间',
  })
  created: Date;

  @UpdateDateColumn({
    comment: '更新时间',
  })
  updated: Date;

  @Column('text', {
    comment: '商品标题',
  })
  title: string;

  @Column('text', {
    comment: '商品描述',
  })
  description: string;

  @Column('text', {
    comment: '商品详情',
  })
  content: string;

  @ManyToOne(type => GoodsCategoryEntity, category => category.goods)
  category: GoodsCategoryEntity;

  @OneToMany(type => GoodsCommentEntity, comment => comment.goods)
  comments: GoodsCommentEntity[];
}
