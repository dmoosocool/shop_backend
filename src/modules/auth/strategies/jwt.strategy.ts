import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt, VerifiedCallback } from 'passport-jwt';
import { JwtPayload } from '../auth.interface';
import { UserService } from 'modules/user/user.service';
import { UserType } from 'core/enums/UserType';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  // 从Auth Header中拿到bearer token.
  constructor(private readonly userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: 'woshinidejia.',
    });
  }

  /**
   * 验证token(用户id,用户名.)
   *
   * @param payload {JwtPayload}
   * @param done {VerifiedCallback}
   */
  async validate(payload: JwtPayload, done: VerifiedCallback) {
    const { email } = payload;
    const entity = await this.userService.findByEmail(email);

    // 因为是根据用户id和用户名所签发的token, 如果从token中拿到的用户名已经被删除或者是修改. 将提示用户“没找到用户”.
    if (!entity) {
      done(new UnauthorizedException('没找到用户'));
    }

    if (entity.type === UserType.ADMIN) {
      // 否则认为token有效将进行后续操作.
      done(null, entity);
    } else {
      done(new UnauthorizedException('权限不足'));
    }
  }
}
