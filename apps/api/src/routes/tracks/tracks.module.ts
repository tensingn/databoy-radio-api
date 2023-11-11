import { Module } from '@nestjs/common';
import { TracksService } from './services/tracks.service';
import { TracksController } from './tracks.controller';
import { FirestoreModule } from '../../services/database/firestore/firestore.module';
import { Track } from './entities/track.entity';
import { UsersModule } from '../users/users.module';
import { TrackLike } from './entities/track-like.entity';
import { TrackLikesService } from './services/track-likes.service';

@Module({
  imports: [
    FirestoreModule.forFeature(Track),
    FirestoreModule.forFeature(TrackLike),
    UsersModule,
  ],
  controllers: [TracksController],
  providers: [TracksService, TrackLikesService],
})
export class TracksModule {}
