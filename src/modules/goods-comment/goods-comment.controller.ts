import {
  Controller,
  Post,
  UseGuards,
  UseInterceptors,
  ClassSerializerInterceptor,
  Param,
  Body,
  Put,
  Delete,
  Get,
} from '@nestjs/common';
import { GoodsCommentService } from './goods-comment.service';
import { AuthGuard } from '@nestjs/passport';
import { GoodsCommentDto } from './goods-comment.dto';
import { User } from 'core/decorators/user.dacorator';
import { UserEntity } from 'modules/user/user.entity';

@Controller('goods-comment')
export class GoodsCommentController {
  constructor(private readonly goodsCommentService: GoodsCommentService) {}

  /**
   * 存储商品评论
   * @param id {string} 商品id
   * @param data {GoodsCommentDto} 商品评论Dto
   * @param user {UserEntity} 用户实体
   */
  @Post('goods/:id/comments')
  @UseGuards(AuthGuard('jwt'))
  @UseInterceptors(ClassSerializerInterceptor)
  async storeGoodsComment(
    @Param('id') id: string,
    @Body() data: GoodsCommentDto,
    @User() user: UserEntity,
  ) {
    return await this.goodsCommentService.storeGoodsComment(id, user, data);
  }

  /**
   * 修改评论
   * @param id {string} 商品评论id
   * @param data {GoodsCommentDto} 商品评论实体
   */
  @Put('comments/:id')
  async update(@Param('id') id: string, @Body() data: GoodsCommentDto) {
    return await this.goodsCommentService.update(id, data);
  }

  /**
   * 删除评论
   * @param id {string} 商品评论id
   */
  @Delete('comments/:id')
  async destory(@Param('id') id: string) {
    return await this.goodsCommentService.destory(id);
  }

  @Get('goods/:id/comments')
  async showGoodsComments(@Param('id') id: string) {
    return await this.goodsCommentService.showGoodsComments(id);
  }

  @Get('users/:id/comments')
  async showUserComments(@Param('id') id: string) {
    return await this.goodsCommentService.showUserComments(id);
  }
}
