import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
export class ParamValidationPipe implements PipeTransform {
  async transform(value, metadata: ArgumentMetadata) {
    if (metadata.type === 'param') {
      // This is the relevant part: value -> { id: value }
      const valueInstance = plainToClass(metadata.metatype, {
        id: value,
      });
      console.log('valueInstance', valueInstance.id.id);
      const validationErrors = await validate(valueInstance);
      if (validationErrors.length > 0) {
        throw new BadRequestException(validationErrors, 'Invalid route param');
      }
      return valueInstance;
    } else {
      return value;
    }
  }
}
