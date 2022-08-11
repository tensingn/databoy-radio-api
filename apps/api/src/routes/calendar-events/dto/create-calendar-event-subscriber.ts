import { IsNumber } from 'class-validator';

export class CreateCalendarEventSubscriptionDto {
  @IsNumber()
  subscriberId: number;

  isGoing: boolean;
}
