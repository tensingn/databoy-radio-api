import { Module } from '@nestjs/common';
import { MusicService } from './music.service';
import { FirestoreModule } from '../database/firestore/firestore.module';
import { Release } from '../../routes/releases/entities/release.entity';
import { Track } from '../../routes/tracks/entities/track.entity';
import { Music } from './entities/music.entity';

@Module({
  imports: [
    FirestoreModule.forFeatures(
      [Track, Release],
      Music.name.toLocaleLowerCase(),
    ),
  ],
  providers: [MusicService],
  exports: [MusicService],
})
export class MusicModule {}
