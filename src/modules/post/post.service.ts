import { Injectable, UsePipes, ValidationPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { PostEntity } from './post.entity';
import { Repository } from 'typeorm';
import { PostDto } from './post.dto';

@Injectable()
export class PostService {
  constructor(
    @InjectRepository(PostEntity)
    private readonly postRepository: Repository<PostEntity>,
  ) {}

  @UsePipes(new ValidationPipe({ transform: true }))
  async store(data: PostDto) {
    const entity = await this.postRepository.create(data);
    await this.postRepository.save(entity);
    return entity;
  }
  /**
   * 查询列表数据
   */
  async selectList() {
    return await this.postRepository.find();
  }
}
