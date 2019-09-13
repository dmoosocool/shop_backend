import { Injectable, UsePipes, ValidationPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GoodsEntity } from './goods.entity';
import { Repository } from 'typeorm';
import { GoodsDto } from './goods.dto';

@Injectable()
export class GoodsService {
  constructor(
    @InjectRepository(GoodsEntity)
    private readonly goodsRepository: Repository<GoodsEntity>,
  ) {}

  @UsePipes(new ValidationPipe({ transform: true }))
  async store(data: GoodsDto) {
    const entity = await this.goodsRepository.create(data);
    await this.goodsRepository.save(entity);
    return entity;
  }
  /**
   * 查询列表数据
   */
  async selectList() {
    return await this.goodsRepository.find();
  }
}
