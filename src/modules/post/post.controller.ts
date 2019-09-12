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
} from '@nestjs/common';
import { PostService } from './post.service';
import { AuthGuard } from '@nestjs/passport';
import { PostDto } from './post.dto';

@Controller('posts')
export class PostController {
  constructor(private readonly postService: PostService) {}
  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard('jwt'))
  async list() {
    return await this.postService.selectList();
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(AuthGuard('jwt'))
  async store(@Body() data: PostDto) {
    return await this.postService.store(data);
  }
}
