import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';

import { userEntity } from './entites/user.entity';
import { CPDto } from './dto/ChangePassword.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(userEntity) private readonly USER: Repository<userEntity>,
  ) {}

  async userInfo(id: string) {
    const info = await this.USER.findOne({
      where: { id },
      relations: { todos: true },
    });

    delete info.password;
    return info;
  }

  async changePassword(CPData: CPDto, id: string) {
    const { oldPassword, newPassword, newPasswordConfirm } = CPData;
    const user = await this.USER.findOneBy({ id });
    if (!user) {
      throw new HttpException('کاربر ناشناخته', HttpStatus.UNAUTHORIZED);
    }
    if (!(await bcrypt.compare(oldPassword, user.password))) {
      throw new HttpException(
        'رمز عبور فعلی اشتباه است',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (newPassword !== newPasswordConfirm) {
      throw new HttpException(
        'رمز های عبور با یکدیگر تفاوت دارند',
        HttpStatus.BAD_REQUEST,
      );
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    this.USER.save(user);

    return new HttpException('تغییر رمز با موفقیت انجام شد', HttpStatus.OK);
  }
}
