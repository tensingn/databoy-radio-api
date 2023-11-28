import { Module } from '@nestjs/common';
import { TracksService } from './services/tracks.service';
import { TracksController } from './tracks.controller';
import { UsersModule } from '../users/users.module';
import { LikesModule } from '../../services/likes/likes.module';
import { MusicModule } from '../../services/music/music.module';

@Module({
  imports: [MusicModule, LikesModule, UsersModule],
  controllers: [TracksController],
  providers: [TracksService],
})
export class TracksModule {}
