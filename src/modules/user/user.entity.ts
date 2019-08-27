import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  UpdateDateColumn,
  BeforeInsert,
  BeforeUpdate,
} from 'typeorm';

import { Exclude } from 'class-transformer';
import { IsEmail } from 'class-validator';
import * as bcrypt from 'bcrypt';
import { UserSex } from 'core/enums/sex';
import { UserType } from 'core/enums/UserType';

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
  @IsEmail()
  email: string;

  @Column({
    comment: '密码',
  })
  @Exclude()
  password: string;

  @Column()
  nickname: string;

  @Column({
    type: 'enum',
    enum: UserSex,
    unique: true,
    default: UserSex.OTHER,
    comment: '性别. 0女 1男 2其他',
  })
  sex: UserSex;

  @Column({
    type: 'enum',
    enum: UserType,
    unique: true,
    default: UserType.MEMBER,
    comment: '用户类型, 0管理员 1会员',
  })
  type: UserType;
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
