import {
  Injectable,
  BadRequestException,
  NotFoundException,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository, Like, getConnection } from 'typeorm';
import { UserDto, UpdatePasswordDto, UserListDto } from './user.dto';
import { UserType } from 'core/enums/UserType';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  @UsePipes(new ValidationPipe({ transform: true }))
  async store(data: UserDto) {
    const { email } = data;
    const user = await this.userRepository.findOne({ email });

    if (user) {
      throw new BadRequestException('用户已经存在');
    }

    const entity = await this.userRepository.create(data);
    await this.userRepository.save(entity);
    return entity;
  }

  async show(id: string) {
    const entity = await this.userRepository.findOne(id);

    if (!entity) {
      throw new NotFoundException('没找到用户');
    }
    return entity;
  }

  async updatePassword(id: string, data: UpdatePasswordDto) {
    const { password, newPassword } = data;
    const entity = await this.userRepository.findOne(id);

    if (!entity) {
      throw new NotFoundException('没找到用户');
    }
    const pass = await entity.comparePassword(password);

    if (!pass) {
      throw new BadRequestException('密码验证失败， 请重新输入正确的密码。');
    }

    entity.password = newPassword;
    return await this.userRepository.save(entity);
  }

  async findByEmail(email: string, password?: boolean) {
    if (password) {
      return await this.userRepository
        .createQueryBuilder('user')
        .where('user.email = :email', { email })
        .addSelect('user.password')
        .getOne();
    } else {
      return await this.userRepository.findOne({ email });
    }
  }

  async selectUserList(dto: UserListDto) {
    const query = {
      ...dto,
      isDeleted: false,
    };
    !query.email
      ? delete query.email
      : (query.email = Like(`%${query.email}%`));
    return await this.userRepository.find({
      ...query,
    });
  }

  async deleteUsers(id: string[] | string) {
    const isMult = typeof id === 'string' ? false : true;

    if (isMult) {
      return await getConnection()
        .createQueryBuilder()
        .update(UserEntity)
        .set({
          isDeleted: true,
        })
        .where('id in (:id)', { id })
        .execute();
    } else {
      return await this.userRepository.update(id, { isDeleted: true });
    }
  }
}
