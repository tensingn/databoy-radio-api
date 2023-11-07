import { Module } from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { SubscribersController } from './subscribers.controller';
import { FirestoreModule } from '../../services/database/firestore/firestore.module';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [FirestoreModule.forFeature(User.collectionName)],
  controllers: [SubscribersController],
  providers: [SubscribersService],
})
export class SubscribersModule {}
