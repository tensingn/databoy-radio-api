import { Inject, Injectable } from '@nestjs/common';
import { CreateUserDto } from '../dto/create-user.dto';
import { UpdateUserDto } from '../dto/update-user.dto';
import {
  FirestoreService,
  QueryOptions,
} from '../../../services/database/firestore/firestore.service';
import { User } from '../entities/user.entity';
import { InjectCollectionByType } from 'apps/api/src/services/database/firestore/firestore.decorators';
import { LikesService } from 'apps/api/src/services/likes/likes.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectCollectionByType(User)
    private firestoreService: FirestoreService,
    @Inject(LikesService)
    private likesService: LikesService,
  ) {}

  create(createUserDto: CreateUserDto): Promise<User> {
    const { id, ...saveUser } = createUserDto;
    const saveID =
      createUserDto.id.split('|').length > 1
        ? createUserDto.id.split('|')[1]
        : null;

    // only can create user types from this endpoint. admin types must be added manually at this time
    const user: User = {
      id: saveID,
      type: 'user',
      ...saveUser,
    };
    return this.firestoreService.addSingle(user, true);
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

  getLikes(id: string) {
    return this.likesService.getCollection(
      LikesService.getQueryOptions(null, id, null),
    );
  }
}
