import { PartialType } from '@nestjs/mapped-types';
import { CreateTrackDto } from './create-track.dto';
import { IsEmpty } from 'class-validator';

export class UpdateTrackDto extends PartialType(CreateTrackDto) {
  @IsEmpty()
  type?: string;
}
