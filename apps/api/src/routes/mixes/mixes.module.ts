import { Module } from '@nestjs/common';
import { MixesService } from './mixes.service';
import { MixesController } from './mixes.controller';
import { Mix } from './entities/mix.entity';
import { MixLike } from './entities/mix-like.entity';
import { SubscribersService } from '../subscribers/subscribers.service';
import { MixMapperService } from './services/mix-mapper.service';
import { Subscriber } from '../subscribers/entities/subscriber.entity';
import { Release } from '../releases/entities/release.entity';

@Module({
  imports: [],
  controllers: [MixesController],
  providers: [MixesService, MixMapperService],
})
export class MixesModule {}
