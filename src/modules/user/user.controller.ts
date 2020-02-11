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
  Req,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserDto, UpdatePasswordDto, UserListDto } from './user.dto';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { UserType } from 'core/enums/UserType';

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
  async list(@Req() req: any) {
    const userList: UserListDto = req.query;
    return await this.userService.selectUserList(userList);
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

  @Delete()
  @UseInterceptors(ClassSerializerInterceptor)
  @UseGuards(AuthGuard('jwt'))
  async deleteUser(@Body() data: UserDto) {
    const { id } = data;

    if (id.indexOf(',') > -1) {
      // 多个删除,
      return await this.userService.deleteUsers(id.split(','));
    } else {
      // 单个删除,
      return await this.userService.deleteUsers(id);
    }
  }
}
