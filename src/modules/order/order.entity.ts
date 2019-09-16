import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToMany,
  ManyToOne,
  OneToMany,
  JoinTable,
} from 'typeorm';
import { GoodsEntity } from 'modules/goods/goods.entity';
import { UserEntity } from 'modules/user/user.entity';

@Entity('order')
export class OrderEntity {
  @PrimaryGeneratedColumn('uuid', {
    comment: '订单id',
  })
  id: string;

  @Column({
    comment: '订单编号',
  })
  orderNo: string;

  @Column({
    comment: '订单编号',
  })
  status: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @ManyToOne(type => UserEntity, user => user.orders)
  user: UserEntity;

  @ManyToMany(type => GoodsEntity)
  @JoinTable({
    name: 'order_goods',
  })
  goods: GoodsEntity[];
}
