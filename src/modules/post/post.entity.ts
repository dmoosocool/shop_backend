import {
  Entity,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  Column,
  UpdateDateColumn,
} from 'typeorm';

@Entity('post')
export class PostEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @CreateDateColumn()
  created: Date;

  @UpdateDateColumn()
  updated: Date;

  @Column('text')
  title: string;

  @Column('text')
  description: string;

  @Column('text')
  content: string;
}
