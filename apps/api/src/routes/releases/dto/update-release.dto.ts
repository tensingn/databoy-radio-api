import { PartialType } from '@nestjs/mapped-types';
import { CreateReleaseDto } from './create-release.dto';
import { IsEmpty } from 'class-validator';

export class UpdateReleaseDto extends PartialType(CreateReleaseDto) {
  @IsEmpty()
  type?: string;
}
