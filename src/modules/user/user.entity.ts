import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
  OneToMany,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import * as bcrypt from 'bcrypt';
import { UserSex } from 'core/enums/sex';
import { UserType } from 'core/enums/UserType';
import { GoodsCommentEntity } from 'modules/goods-comment/goods-comment.entity';
import { OrderEntity } from 'modules/order/order.entity';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid', {
    comment: '用户主键',
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

  @Column('varchar', {
    unique: true,
    comment: '电子邮箱',
  })
  email: string;

  @Column({
    select: false,
    comment: '密码',
  })
  @Exclude()
  password: string;

  @Column()
  nickname: string;

  @Column({
    type: 'enum',
    enum: UserSex,
    default: UserSex.OTHER,
    comment: '性别. 0女 1男 2其他',
  })
  sex: UserSex;

  @Column({
    type: 'enum',
    enum: UserType,
    default: UserType.MEMBER,
    comment: '用户类型, 0管理员 1会员',
  })
  type: UserType;

  @Column({
    type: 'boolean',
    default: false,
    comment: '已删除',
  })
  isDeleted: boolean;

  /** 用户评论 */
  @OneToMany(type => GoodsCommentEntity, comment => comment.user)
  comments: GoodsCommentEntity[];

  /** 用户订单 */
  @OneToMany(type => OrderEntity, order => order.user)
  orders: OrderEntity[];
  /**
   * 在记录插入、更新前, 将用户密码进行hash加密.
   */
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 12);
  }

  async comparePassword(password: string) {
    return await bcrypt.compare(password, this.password);
  }
}
