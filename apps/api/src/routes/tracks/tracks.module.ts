import { Module } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { TracksController } from './tracks.controller';
import { FirestoreModule } from '../../services/database/firestore/firestore.module';
import { Track } from './entities/track.entity';

@Module({
  imports: [FirestoreModule.forFeature(Track.collectionName)],
  controllers: [TracksController],
  providers: [TracksService],
})
export class TracksModule {}
