import { IsAfterDate } from 'apps/api/src/decorators/is-after-date.decorator';
import { IsDate, IsEmpty, IsIn, IsNotEmpty } from 'class-validator';
import { LiveEvent } from '../entities/live-event.entity';
import { ReleaseEvent } from '../entities/release-event.entity';
import { StreamEvent } from '../entities/stream-event.entity';
import { Type } from 'class-transformer';

export class CreateCalendarEventDto {
  @IsNotEmpty()
  title: string;

  @IsDate()
  @Type(() => Date)
  startTime: Date;

  @IsDate()
  @Type(() => Date)
  @IsAfterDate('startTime', {
    message: 'EndTime must be after StartTime',
  })
  endTime: Date;

  description: string;

  @IsNotEmpty()
  @IsIn([
    LiveEvent.name.toLocaleLowerCase(),
    ReleaseEvent.name.toLocaleLowerCase(),
    StreamEvent.name.toLocaleLowerCase(),
  ])
  type: string;

  // only want going for internal setting, not to be explicitly sent from client
  @IsEmpty()
  numGoing: number;
}
