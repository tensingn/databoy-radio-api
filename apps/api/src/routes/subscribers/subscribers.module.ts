import { Module } from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { SubscribersController } from './subscribers.controller';
import { Subscriber } from './entities/subscriber.entity';

@Module({
  imports: [],
  controllers: [SubscribersController],
  providers: [SubscribersService],
})
export class SubscribersModule {}
