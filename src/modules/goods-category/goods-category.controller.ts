import {
  Controller,
  Post,
  Body,
  UseGuards,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { GoodsCategoryService } from './goods-category.service';
import { GoodsCategoryDto } from './goods-category.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('goods-categories')
export class GoodsCategoryController {
  constructor(private readonly goodsCategoryService: GoodsCategoryService) {}

  @Post()
  @UseGuards(AuthGuard('jwt'))
  @UsePipes(new ValidationPipe({ transform: true }))
  async store(@Body() data: GoodsCategoryDto) {
    return this.goodsCategoryService.store(data);
  }
}
