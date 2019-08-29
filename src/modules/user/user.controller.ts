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
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto, UpdatePasswordDto } from './user.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
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
  async show(@Param('id') id: string) {
    return await this.userService.show(id);
  }

  @Get()
  @UseInterceptors(ClassSerializerInterceptor)
  async list() {
    return await this.userService.selectMemberList();
  }
  /**
   * 更新用户密码
   * 通过 @UseInterceptors(ClassSerializerInterceptor) 过滤拦截掉返回数据中的敏感数据.
   * @param id {string}
   * @param data {UpdatePasswordDto}
   */
  @Put(':id/password')
  @UseInterceptors(ClassSerializerInterceptor)
  async updatePassword(
    @Param('id') id: string,
    @Body() data: UpdatePasswordDto,
  ) {
    return await this.userService.updatePassword(id, data);
  }
}
