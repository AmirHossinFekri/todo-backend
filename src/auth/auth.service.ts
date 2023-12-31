import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { userEntity } from 'src/users/entites/user.entity';
import { RegisterDto } from './dto/register.dto';
@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(userEntity) private readonly USER: Repository<userEntity>,
    private readonly jwtService: JwtService,
  ) {}

  async register(registerData: RegisterDto) {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { email, name, password, confirmPassword } = registerData;
    const user = await this.USER.findOneBy({ email });
    if (password !== confirmPassword) {
      throw new HttpException(
        'رمز های عبور با یکدیگر تفاوت دارند',
        HttpStatus.BAD_REQUEST,
      );
    }

    if (user) {
      throw new HttpException(
        'کاربری با این مشخصات وجود دارد',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = this.USER.create({ email, name, password: hashedPassword });
    this.USER.save(newUser);
    return new HttpException('ثبت نام با موفقیت انجام شد', HttpStatus.CREATED);
  }

  async login(loginData: any) {
    const { email, password } = loginData;
    const user = await this.USER.findOneBy({ email });
    if (!user) {
      throw new HttpException(
        'رمز یا ایمیل اشتباه است',
        HttpStatus.BAD_REQUEST,
      );
    }
    if (!(await bcrypt.compare(password, user.password))) {
      throw new HttpException(
        'رمز یا ایمیل اشتباه است',
        HttpStatus.BAD_REQUEST,
      );
    }
    const payload = { sub: user.id, username: user.email };
    return {
      access_token: await this.jwtService.signAsync(payload),
    };
  }
}
