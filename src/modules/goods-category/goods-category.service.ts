import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GoodsCategoryEntity } from './goods-category.entity';
import { Repository } from 'typeorm';
import { GoodsCategoryDto } from './goods-category.dto';

@Injectable()
export class GoodsCategoryService {
  constructor(
    @InjectRepository(GoodsCategoryEntity)
    private readonly goodsCategoryRepository: Repository<GoodsCategoryEntity>,
  ) {}

  async store(data: GoodsCategoryDto) {
    const entity = await this.goodsCategoryRepository.create(data);
    return await this.goodsCategoryRepository.save(entity);
  }
}
