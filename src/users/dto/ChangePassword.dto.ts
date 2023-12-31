import { IsNotEmpty, IsString, IsStrongPassword } from 'class-validator';

export class CPDto {
  @IsString({ message: 'پسورد قدیمی معتبر نیست' })
  @IsNotEmpty({ message: 'پسورد قدیمی برای تغیر رمز اجباری است' })
  oldPassword: string;

  @IsString({ message: 'پسورد جدید معتبر نیست' })
  @IsNotEmpty({ message: 'پسورد جدید برای تغیر رمز اجباری است' })
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
  newPassword: string;

  @IsString({ message: 'تاییده ی پسورد معتبر نیست' })
  @IsNotEmpty({ message: 'تاییده ی پسورد برای تغیر رمز اجباری است' })
  newPasswordConfirm: string;
}
