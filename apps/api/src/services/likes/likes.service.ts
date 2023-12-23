import { Inject, Injectable } from '@nestjs/common';
import {
  FirestoreService,
  QueryOptions,
  WhereClause,
} from 'apps/api/src/services/database/firestore/firestore.service';
import { AlreadyExistsException } from 'apps/api/src/exceptions/already-exists.exception';
import { NotFoundException } from 'apps/api/src/exceptions/not-found.exception';
import { Like } from './entities/like.entity';
import { LikeDto } from './dto/like.dto';

@Injectable()
export class LikesService {
  constructor(
    @Inject(Like.name.toLocaleLowerCase())
    private firestoreService: FirestoreService,
  ) {}

  async create(createLikeDto: LikeDto): Promise<Like> {
    if (
      await this.likeExists(
        createLikeDto.likedItemID,
        createLikeDto.userID,
        createLikeDto.type,
      )
    ) {
      throw new AlreadyExistsException(Like);
    }

    return this.firestoreService.addSingle<Like>(
      Object.assign(new Like(createLikeDto.type), createLikeDto),
    );
  }

  async delete(likeDto: LikeDto): Promise<void> {
    // using getCollection because we don't have an ID yet.
    // also, there shouldn't be more than 1 like for each user/item pair,
    // but this deletes all if there does happen to be more than 1.
    const likes = await this.getCollection(
      LikesService.getQueryOptions(
        likeDto.likedItemID,
        likeDto.userID,
        likeDto.type,
      ),
    );

    if (!likes || likes.length < 1) {
      throw new NotFoundException(Like);
    }

    const deletePromises = [];
    likes.forEach((tl) =>
      deletePromises.push(this.firestoreService.deleteSingle(tl.id)),
    );

    await Promise.all(deletePromises);
  }

  getCollection<TLike extends Like>(
    query: QueryOptions,
  ): Promise<Array<TLike>> {
    return this.firestoreService.getCollection(query);
  }

  private async likeExists(
    likeID: string,
    userID: string,
    type: string,
  ): Promise<boolean> {
    return (
      (
        await this.getCollection(
          LikesService.getQueryOptions(likeID, userID, type),
        )
      ).length > 0
    );
  }

  static getQueryOptions(
    likedItemID: string,
    userID: string,
    type: string,
    limit: number = 10,
    startAfter: string = null,
  ): QueryOptions {
    const whereClauses = new Array<WhereClause>();

    if (likedItemID) {
      whereClauses.push({
        field: 'likedItemID',
        operation: '==',
        value: likedItemID,
      });
    }

    if (userID) {
      whereClauses.push({
        field: 'userID',
        operation: '==',
        value: userID,
      });
    }

    if (type) {
      whereClauses.push({
        field: 'type',
        operation: '==',
        value: type,
      });
    }

    if (whereClauses.length < 1) {
      // TODO - define error
      throw new Error('Must specify a likedItemID, userID, or type.');
    }

    return {
      whereOptions: {
        pagingOptions: {
          limit,
          startAfter,
        },
        whereClauses,
      },
    };
  }
}
