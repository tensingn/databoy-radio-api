import { Module } from '@nestjs/common';
import { LikesService } from './likes.service';
import { FirestoreModule } from '../database/firestore/firestore.module';
import { Like } from './entities/like.entity';
import { ReleaseLike } from '../../routes/releases/entities/release-like.entity';
import { TrackLike } from '../../routes/tracks/entities/track-like.entity';

@Module({
  imports: [
    FirestoreModule.forFeatures(
      [ReleaseLike, TrackLike],
      Like.name.toLocaleLowerCase(),
    ),
  ],
  providers: [LikesService],
  exports: [LikesService],
})
export class LikesModule {}
