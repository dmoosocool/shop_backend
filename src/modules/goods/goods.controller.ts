import {
  Controller,
  Get,
  UseInterceptors,
  ClassSerializerInterceptor,
  UseGuards,
  Post,
  UsePipes,
  ValidationPipe,
  Body,
  Query,
} from '@nestjs/common';
import { GoodsService } from './goods.service';
import { AuthGuard } from '@nestjs/passport';
import { GoodsDto } from './goods.dto';
import { ListOptions } from 'core/decorators/list-options.dacorator';
import { ListOptionsInterface } from 'core/interfaces/list-options.interface';

@Controller('goods')
export class GoodsController {
  constructor(private readonly goodsService: GoodsService) {}
  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard('jwt'))
  async list(@ListOptions() options: ListOptionsInterface) {
    return await this.goodsService.selectList(options);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(AuthGuard('jwt'))
  async store(@Body() data: GoodsDto) {
    return await this.goodsService.store(data);
  }
}
