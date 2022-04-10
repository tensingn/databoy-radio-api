import { Module } from '@nestjs/common';
import { MixesService } from './mixes.service';
import { MixesController } from './mixes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mix } from './entities/mix.entity';
import { MixLike } from './entities/mix-like.entity';
import { SubscribersService } from '../subscribers/subscribers.service';
import { MixMapperService } from './services/mix-mapper.service';
import { Subscriber } from '../subscribers/entities/subscriber.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mix, MixLike, Subscriber])],
  controllers: [MixesController],
  providers: [MixesService, MixMapperService, SubscribersService],
})
export class MixesModule {}
