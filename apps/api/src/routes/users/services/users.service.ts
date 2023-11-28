import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import {
  FirestoreService,
  QueryOptions,
} from '../../../services/database/firestore/firestore.service';
import { User } from '../entities/user.entity';
import { InjectCollectionByType } from 'apps/api/src/services/database/firestore/firestore.decorators';

@Injectable()
export class UsersService {
  constructor(
    @InjectCollectionByType(User)
    private firestoreService: FirestoreService,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    // only can create user types from this endpoint. admin types must be added manually at this time
    const user: User = { id: null, type: 'user', ...createUserDto };
    return this.firestoreService.addSingle(user);
  }

  getCollection(query: QueryOptions): Promise<Array<User>> {
    return this.firestoreService.getCollection<User>(query);
  }

  getOne(id: string): Promise<User> {
    return this.firestoreService.getSingle<User>(id);
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<Object> {
    return this.firestoreService.updateSingle(id, updateUserDto);
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
}
