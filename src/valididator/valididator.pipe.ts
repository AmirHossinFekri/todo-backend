import {
  PipeTransform,
  Injectable,
  ArgumentMetadata,
  BadRequestException,
} from '@nestjs/common';
import { validate, ValidationError } from 'class-validator';
import { plainToClass } from 'class-transformer';

@Injectable()
export class ValidationPipe implements PipeTransform<any> {
  async transform(value: any, metadata: ArgumentMetadata): Promise<any> {
    const { metatype } = metadata;
    if (!metatype || !this.toValidate(metatype)) {
      return value;
    }

    const object = plainToClass(metatype, value);
    const errors = await validate(object);

    if (errors.length > 0) {
      const validationErrors = this.formatErrors(errors);
      throw new BadRequestException({ message: validationErrors });
    }

    return value;
  }

  private toValidate(metatype): boolean {
    const types = [String, Boolean, Number, Array, Object];
    return !types.includes(metatype);
  }

  private formatErrors(errors: ValidationError[]): Record<string, string[]> {
    const formattedErrors: Record<string, string[]> = {};

    errors.forEach((error) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      Object.entries(error.constraints).forEach(([key, message]) => {
        formattedErrors[error.property] = formattedErrors[error.property] || [];
        formattedErrors[error.property].push(message);
      });
    });

    return formattedErrors;
  }
}
