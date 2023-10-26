import { Module } from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { SubscribersController } from './subscribers.controller';
import { FirestoreModule } from '../../services/database/firestore/firestore.module';

@Module({
  imports: [FirestoreModule.forFeature('users')],
  controllers: [SubscribersController],
  providers: [SubscribersService],
})
export class SubscribersModule {}
