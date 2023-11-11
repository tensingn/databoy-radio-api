import { Inject, Injectable } from '@nestjs/common';
import {
  FirestoreService,
  QueryOptions,
} from 'apps/api/src/services/database/firestore/firestore.service';
import { TrackLike } from '../entities/track-like.entity';
import { TrackLikeDto } from '../dto/track-like.dto';
import { AlreadyExistsException } from 'apps/api/src/exceptions/already-exists.exception';
import { NotFoundException } from 'apps/api/src/exceptions/not-found.exception';

@Injectable()
export class TrackLikesService {
  constructor(
    @Inject(TrackLike.name)
    private firestoreService: FirestoreService,
  ) {}

  async create(createTrackLikeDto: TrackLikeDto): Promise<TrackLike> {
    if (
      await this.likeExists(
        createTrackLikeDto.trackID,
        createTrackLikeDto.userID,
      )
    ) {
      throw new AlreadyExistsException(TrackLike);
    }

    return this.firestoreService.addSingle<TrackLike>(
      Object.assign(new TrackLike(), createTrackLikeDto),
    );
  }

  async delete(trackLikeDto: TrackLikeDto): Promise<void> {
    // using getCollection because we don't have an ID yet.
    // also, there shouldn't be more than 1 like for each track/user pair,
    // but this deletes all if there does happen to be more than 1.
    const trackLikes = await this.getCollection(
      this.getQueryOptions(trackLikeDto.trackID, trackLikeDto.userID),
    );

    if (!trackLikes || trackLikes.length < 1) {
      throw new NotFoundException(TrackLike);
    }

    const deletePromises = [];
    trackLikes.forEach((tl) =>
      deletePromises.push(this.firestoreService.deleteSingle(tl.id)),
    );

    await Promise.all(deletePromises);
  }

  getCollection(options: QueryOptions): Promise<TrackLike[]> {
    return this.firestoreService.getCollection(options);
  }

  private async likeExists(trackID: string, userID: string): Promise<boolean> {
    return (
      (await this.getCollection(this.getQueryOptions(trackID, userID))).length >
      0
    );
  }

  private getQueryOptions(trackID: string, userID: string): QueryOptions {
    return {
      whereOptions: {
        pagingOptions: {
          limit: 1,
          startAfter: null,
        },
        whereClauses: [
          {
            field: 'trackID',
            operation: '==',
            value: trackID,
          },
          {
            field: 'userID',
            operation: '==',
            value: userID,
          },
        ],
      },
    };
  }
}
