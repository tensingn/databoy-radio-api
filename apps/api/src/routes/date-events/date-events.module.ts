import { Module } from '@nestjs/common';
import { DateEventsService } from './date-events.service';
import { DateEventsController } from './date-events.controller';
import { DateEvent } from './entities/date-event.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DateService } from '../../services/date/date.service';

@Module({
  imports: [TypeOrmModule.forFeature([DateEvent])],
  controllers: [DateEventsController],
  providers: [DateEventsService, DateService],
})
export class DateEventsModule {}
