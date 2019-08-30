import { IsEmail, MaxLength, MinLength } from 'class-validator';
import { UserType } from 'core/enums/UserType';
import { UserSex } from 'core/enums/sex';

export class UserDto {
  @IsEmail(undefined, {
    message: '邮箱格式不正确.',
  })
  readonly email: string;
  @MaxLength(16, { message: '密码最大长度不得超过16位.' })
  @MinLength(6, { message: '密码最小长度不得少于6位.' })
  readonly password: string;
}

export class UpdatePasswordDto {
  readonly password: string;
  readonly newPassword: string;
}

export class UserListDto {
  readonly email?: string;
  readonly type?: UserType;
  readonly sex?: UserSex;
}
