import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class TransformBooleanPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    if (typeof value != 'boolean') {
      return value?.toLocaleLowerCase() === 'true';
    }
    return value;
  }
}
