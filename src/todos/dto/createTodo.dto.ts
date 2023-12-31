import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTodoDto {
  @IsString({ message: 'عنوان معتبر نیست ' })
  @IsNotEmpty({ message: 'عنوان نمی تواند خالی باشد' })
  title: string;

  @IsString({ message: 'توضیح معتبر نیست ' })
  description: string;
}
