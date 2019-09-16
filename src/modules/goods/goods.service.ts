import { Injectable, UsePipes, ValidationPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GoodsEntity } from './goods.entity';
import { Repository } from 'typeorm';
import { GoodsDto } from './goods.dto';
import { ListOptionsInterface } from 'core/interfaces/list-options.interface';

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
  async selectList(options: ListOptionsInterface) {
    // 这里的 relations 中的内容并不是表名, 而是entity中定义的关系的别名.
    // return await this.goodsRepository.find({ relations: ['category'] });

    const { categories } = options;
    const queryBuilder = await this.goodsRepository.createQueryBuilder('goods');
    queryBuilder.leftJoinAndSelect('goods.category', 'category');

    // 如果是需要根据分类查询的话 添加查询语句
    if (categories) {
      // 优化下 sql, 当categories为多个的时候才使用 IN 语句,
      if (categories.length > 1) {
        queryBuilder.where('category.alias IN (:...categories)', {
          categories,
        });
      } else {
        queryBuilder.where('category.alias = :categories', { categories });
      }
    }
    queryBuilder.orderBy('updated', 'DESC');

    const entities = queryBuilder.getMany();
    return entities;
  }
}
