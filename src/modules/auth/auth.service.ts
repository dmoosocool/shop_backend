import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { UserService } from 'modules/user/user.service';
import { LoginDto } from './auth.dto';
import { JwtPayload } from './auth.interface';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) { }

  /**
   * 登陆验权。
   * @param data
   */
  async login(data: LoginDto) {
    const { email, password } = data;
    const entity = await this.userService.findByEmail(email);

    // 用户不存在.
    if ( !entity ) {
      throw new NotFoundException('用户名不存在');
    }

    // 密码不匹配.
    if ( !(await entity.comparePassword(password)) ) {
      throw new UnauthorizedException('密码不匹配');
    }

    const { id, nickname} = entity;
    const payload = { id, email, nickname};
    const token = this.signToken( payload );

    return {
      ...payload,
      token,
    };
  }

  /**
   * 根据用户id及用户名生成token.
   * @param data
   */
  signToken(data: JwtPayload) {
    return this.jwtService.sign(data);
  }
}
