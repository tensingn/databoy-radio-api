import { Module } from '@nestjs/common';
import { CalendarEventsService } from './services/calendar-events.service';
import { CalendarEventsController } from './calendar-events.controller';
import { CalendarEvent } from './entities/calendar-event.entity';
import { FirestoreModule } from '../../services/database/firestore/firestore.module';
import { LiveEvent } from './entities/live-event.entity';
import { ReleaseEvent } from './entities/release-event.entity';
import { StreamEvent } from './entities/stream-event.entity';
import { UsersModule } from '../users/users.module';
import { CalendarEventGoingService } from './services/calendar-event-going.service';
import { Going } from './entities/going.entity';

@Module({
  imports: [
    FirestoreModule.forFeatures(
      [LiveEvent, ReleaseEvent, StreamEvent],
      CalendarEvent.collectionName,
    ),
    FirestoreModule.forFeature(Going),
    UsersModule,
  ],
  controllers: [CalendarEventsController],
  providers: [CalendarEventsService, CalendarEventGoingService],
})
export class CalendarEventsModule {}
