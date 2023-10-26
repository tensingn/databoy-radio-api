import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  FirestoreService,
  PagingOptions,
  QueryOptions,
} from '../../services/database/firestore/firestore.service';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @Inject('users')
    private firestoreService: FirestoreService,
  ) {}

  create(createUserDto: CreateUserDto) {
    return 'This action adds a new user';
  }

  async findCollection(query: QueryOptions): Promise<Array<User>> {
    const users = await this.firestoreService.getCollection<User>(query, User);

    return users;
  }

  async findOne(id: string): Promise<User> {
    const user = await this.firestoreService.getSingle<User>(id, User);

    return user;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
