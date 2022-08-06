import { IsDate, IsDateString, IsNumber } from 'class-validator';

export class CreateCalendarEventDto {
  title: string;

  @IsDateString()
  startTime: Date;

  @IsDateString()
  endTime: Date;

  description: string;

  @IsNumber()
  calendarEventTypeId: number;
}
