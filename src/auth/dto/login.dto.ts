import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class loginDto {
  @IsNotEmpty({ message: 'ایمیل نباید خالی باشد' })
  @IsEmail({}, { message: 'ایمیل وارد شده معتبر نیست' })
  email: string;

  @IsString({ message: 'رمز عبور معتبر نمی باشد' })
  @IsNotEmpty({ message: 'رمز نباید خالی باشد' })
  password: string;
}
