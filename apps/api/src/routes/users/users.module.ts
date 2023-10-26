import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { FirestoreModule } from '../../services/database/firestore/firestore.module';

@Module({
  imports: [FirestoreModule.forFeature('users')],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
