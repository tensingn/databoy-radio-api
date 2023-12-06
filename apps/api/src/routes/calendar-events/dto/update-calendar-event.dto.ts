import { PartialType } from '@nestjs/mapped-types';
import { IsEmpty } from 'class-validator';
import { CreateCalendarEventDto } from './create-calendar-event.dto';

export class UpdateCalendarEventDto extends PartialType(
  CreateCalendarEventDto,
) {
  @IsEmpty()
  type?: string;
}
