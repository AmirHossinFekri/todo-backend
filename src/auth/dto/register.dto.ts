import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsStrongPassword,
  Length,
} from 'class-validator';

export class RegisterDto {
  @IsNotEmpty({ message: 'قسمت نام نباید خالی باشد' })
  @IsString({ message: 'اسم وارد شده معتبر نیست' })
  @Length(1, 20, { message: 'اسم وارد شده باید بین 1 تا 20 کاراکتر باشد' })
  name: string;

  @IsNotEmpty({ message: 'ایمیل نباید خالی باشد' })
  @IsEmail({}, { message: 'ایمیل وارد شده معتبر نیست' })
  email: string;

  @IsNotEmpty({ message: 'رمز نباید خالی باشد' })
  @IsStrongPassword(
    {
      minLength: 6,
      minLowercase: 1,
      minUppercase: 1,
      minNumbers: 1,
      minSymbols: 1,
    },
    {
      message:
        'رمز وارد شده باید دارای حداقل 6 کارکتر باشد، یک حرف بزرگ، یک حرف کوچک، یک عدد و یک کاراکتر خاص باشد',
    },
  )
  password: string;

  @IsString()
  @IsNotEmpty({ message: 'تاییده ی پسورد نباید خالی باشد' })
  confirmPassword: string;
}
