import { ArgumentMetadata, PipeTransform } from '@nestjs/common';

export class TransformBooleanPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    return value?.toLocaleLowerCase() === 'true';
  }
}
