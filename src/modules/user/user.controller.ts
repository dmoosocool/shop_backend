import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseInterceptors,
  ClassSerializerInterceptor,
  Put,
  UsePipes,
  ValidationPipe,
  UseGuards,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto, UpdatePasswordDto, UserListDto } from './user.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  @UseGuards(AuthGuard('jwt'))
  async store(@Body() data: UserDto) {
    return await this.userService.store(data);
  }

  /**
   * 根据id获取用户信息.
   * 通过 @UseInterceptors(ClassSerializerInterceptor) 过滤拦截掉返回数据中的敏感数据.
   * @param id 用户id/
   */
  @Get(':id')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard('jwt'))
  async show(@Param('id') id: string) {
    return await this.userService.show(id);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard('jwt'))
  async list(@Body() query: UserListDto) {
    return await this.userService.selectUserList(query);
  }
  /**
   * 更新用户密码
   * 通过 @UseInterceptors(ClassSerializerInterceptor) 过滤拦截掉返回数据中的敏感数据.
   * @param id {string}
   * @param data {UpdatePasswordDto}
   */
  @Put(':id/password')
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard('jwt'))
  async updatePassword(
    @Param('id') id: string,
    @Body() data: UpdatePasswordDto,
  ) {
    return await this.userService.updatePassword(id, data);
  }
}
