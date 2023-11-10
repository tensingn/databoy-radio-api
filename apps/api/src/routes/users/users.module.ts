import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { FirestoreModule } from '../../services/database/firestore/firestore.module';
import { User } from './entities/user.entity';

@Module({
  imports: [FirestoreModule.forFeature(User)],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
