import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('file')
export class FileEntity {
  @PrimaryGeneratedColumn('uuid', {
    comment: '文件主键',
  })
  id: string;

  @Column({
    comment: '原文件名',
  })
  originalname: string;

  @Column({
    comment: '文件名',
  })
  filename: string;

  @Column({
    comment: '文件类型',
  })
  mimetype: string;

  @Column({
    comment: '文件大小',
  })
  size: number;
}
