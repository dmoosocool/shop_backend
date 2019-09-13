import { Injectable } from '@nestjs/common';
import { FileDto } from './file.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { FileEntity } from './file.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FileService {

  constructor(
    @InjectRepository(FileEntity) private readonly fileRepository: Repository<FileEntity>,
  ) {}

  async store( data: FileDto) {
    return await this.fileRepository.save(data);
  }

  async show(id: number) {
    return await this.fileRepository.findOne(id);
  }
}
