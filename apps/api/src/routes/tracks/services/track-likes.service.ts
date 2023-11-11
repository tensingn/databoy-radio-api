import { Inject, Injectable } from '@nestjs/common';
import {
  FirestoreService,
  QueryOptions,
} from 'apps/api/src/services/database/firestore/firestore.service';
import { TrackLike } from '../entities/track-like.entity';
import { CreateTrackLikeDto } from '../dto/create-track-like.dto';
import { AlreadyExistsException } from 'apps/api/src/exceptions/already-exists.exception';

@Injectable()
export class TrackLikesService {
  constructor(
    @Inject(TrackLike.name)
    private firestoreService: FirestoreService,
  ) {}

  async create(createTrackLikeDto: CreateTrackLikeDto): Promise<TrackLike> {
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

  getCollection(options: QueryOptions): Promise<TrackLike[]> {
    return this.firestoreService.getCollection(options);
  }

  private async likeExists(trackID: string, userID: string): Promise<boolean> {
    const options: QueryOptions = {
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

    return (await this.getCollection(options)).length > 0;
  }
}
