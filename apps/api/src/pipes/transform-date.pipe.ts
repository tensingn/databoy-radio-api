import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import { isDateValid } from '../utils/date/date.utils';

export class TransformDatePipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata): Date {
    const ret = new Date(Date.parse(value));

    if (!isDateValid(ret)) {
      throw new BadRequestException('Invalid date.');
    }

    return ret;
  }
}
