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
import * as bcrypt from 'bcrypt';

@Entity('user')
export class UserEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column('varchar', {
    unique: true
  })
  name: string;

  @Column()
  @Exclude()
  password: string;

  /**
   * 在记录插入、更新前, 将用户密码进行hash加密.
   */
  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword() {
    this.password = await bcrypt.hash( this.password, 12 );
  }

  async comparePassword(password: string) {
    return await bcrypt.compare( password, this.password ); 
  }
}