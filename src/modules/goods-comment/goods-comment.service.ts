import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GoodsCommentEntity } from './goods-comment.entity';
import { Repository } from 'typeorm';
import { UserEntity } from 'modules/user/user.entity';
import { GoodsCommentDto } from './goods-comment.dto';

@Injectable()
export class GoodsCommentService {
  constructor(
    @InjectRepository(GoodsCommentEntity)
    private readonly goodsCommentRepository: Repository<GoodsCommentEntity>,
  ) {}

  /**
   * 存储商品评论
   * @param id {string} 商品id
   * @param user {UserEntity} 用户实例
   * @param data {GoodsCommentDto} 商品评论dto
   */
  async storeGoodsComment(id: string, user: UserEntity, data: GoodsCommentDto) {
    return await this.goodsCommentRepository.save({
      user,
      ...data,
      goods: { id },
    });
  }

  /**
   * 更新商品评论
   * @param id {string} 商品评论id
   * @param data {GoodsCommentDto} 商品评论dto
   */
  async update(id: string, data: GoodsCommentDto) {
    return await this.goodsCommentRepository.update(id, data);
  }

  /**
   * 删除商品评论
   * @param id {string} 商品评论id
   */
  async destory(id: string) {
    return await this.goodsCommentRepository.delete(id);
  }

  /**
   * 显示商品评论
   * @param id 商品id
   */
  async showGoodsComments(id: string) {
    return await this.goodsCommentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .leftJoinAndSelect('comment.goods', 'goods')
      .where('goods.id = :id', { id })
      .getMany();
  }

  /**
   * 显示用户评论
   * @param id 用户id
   */
  async showUserComments(id: string) {
    return await this.goodsCommentRepository
      .createQueryBuilder('comment')
      .leftJoinAndSelect('comment.user', 'user')
      .leftJoinAndSelect('comment.goods', 'goods')
      .where('user.id = :id', { id })
      .getMany();
  }
}
