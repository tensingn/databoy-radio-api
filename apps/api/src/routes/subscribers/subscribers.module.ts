import { Module } from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { SubscribersController } from './subscribers.controller';
import { Subscriber } from './entities/subscriber.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ReleaseLike } from '../releases/entities/release-like.entity';
import { MixLike } from '../mixes/entities/mix-like.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Subscriber])],
  controllers: [SubscribersController],
  providers: [SubscribersService],
})
export class SubscribersModule {}
