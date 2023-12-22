import { Module } from '@nestjs/common';
import { UsersService } from './services/users.service';
import { UsersController } from './users.controller';
import { FirestoreModule } from '../../services/database/firestore/firestore.module';
import { User } from './entities/user.entity';
import { LikesModule } from '../../services/likes/likes.module';

@Module({
  imports: [FirestoreModule.forFeature(User), LikesModule],
  controllers: [UsersController],
  providers: [UsersService],
  exports: [UsersService],
})
export class UsersModule {}
