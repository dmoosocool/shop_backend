import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { GoodsEntity } from 'modules/goods/goods.entity';
import { UserEntity } from 'modules/user/user.entity';

@Entity('goods_comment')
export class GoodsCommentEntity {
  @PrimaryGeneratedColumn('uuid', {
    comment: '商品评论id',
  })
  id: string;

  /**
   * 允许为空
   */
  @Column({
    nullable: true,
    comment: '评论标题',
  })
  title: string;

  @Column({
    comment: '评论内容',
  })
  content: string;

  @CreateDateColumn({
    comment: '评论创建时间',
  })
  created: Date;

  @UpdateDateColumn({
    comment: '评论修改时间',
  })
  updated: Date;

  @ManyToOne(type => GoodsEntity, goods => goods.comments, { nullable: false })
  goods: GoodsEntity;

  @ManyToOne(type => UserEntity, user => user.comments, { nullable: false })
  user: UserEntity;
}
