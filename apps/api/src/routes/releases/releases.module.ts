import { Module } from '@nestjs/common';
import { ReleasesService } from './releases.service';
import { ReleasesController } from './releases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Release } from './entities/release.entity';
import { ReleaseLike } from './entities/release-like.entity';
import { ReleaseMapperService } from './services/release-mapper.service';
import { MixMapperService } from '../mixes/services/mix-mapper.service';
import { SubscribersService } from '../subscribers/subscribers.service';
import { Subscriber } from '../subscribers/entities/subscriber.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Release, ReleaseLike, Subscriber])],
  controllers: [ReleasesController],
  providers: [
    ReleasesService,
    ReleaseMapperService,
    MixMapperService,
    SubscribersService,
  ],
})
export class ReleasesModule {}
