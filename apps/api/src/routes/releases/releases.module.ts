import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { ReleasesController } from './releases.controller';
import { ReleasesService } from './services/releases.service';
import { LikesModule } from '../../services/likes/likes.module';
import { TracksModule } from '../tracks/tracks.module';
import { MusicModule } from '../../services/music/music.module';

@Module({
  imports: [UsersModule, TracksModule, LikesModule, MusicModule],
  controllers: [ReleasesController],
  providers: [ReleasesService],
})
export class ReleasesModule {}
