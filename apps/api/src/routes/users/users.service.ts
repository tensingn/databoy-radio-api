import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  FirestoreService,
  PagingOptions,
} from '../../services/database/firestore/firestore.service';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject(FirestoreService)
    private firestoreService: FirestoreService,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findAll(startAfter: string, limit: number): Promise<Array<User>> {
    const users = await this.firestoreService.getCollection<User>(
      {
        pagingOptions: {
          startAfter,
          limit,
        },
      },
      User,
    );

    return users;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
