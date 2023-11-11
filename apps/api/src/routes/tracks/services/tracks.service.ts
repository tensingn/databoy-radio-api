import { Inject, Injectable } from '@nestjs/common';
import { CreateTrackDto } from '../dto/create-track.dto';
import { Track } from '../entities/track.entity';
import {
  FirestoreService,
  QueryOptions,
} from '../../../services/database/firestore/firestore.service';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { UsersService } from '../../users/services/users.service';
import { TrackLike } from '../entities/track-like.entity';
import { TrackLikesService } from './track-likes.service';
import { InjectCollection } from 'apps/api/src/services/database/firestore/firestore.decorators';
import { NotFoundException } from 'apps/api/src/exceptions/not-found.exception';
import { User } from '../../users/entities/user.entity';

@Injectable()
export class TracksService {
  constructor(
    @InjectCollection(Track)
    private firestoreService: FirestoreService,
    @Inject(TrackLikesService)
    private trackLikesService: TrackLikesService,
    @Inject(UsersService)
    private usersService: UsersService,
  ) {}

  create(createTrackDto: CreateTrackDto): Promise<Track> {
    return this.firestoreService.addSingle<Track>(
      Object.assign(new Track(), createTrackDto),
    );
  }

  getCollection(query: QueryOptions): Promise<Array<Track>> {
    return this.firestoreService.getCollection(query);
  }

  getOne(id: string): Promise<Track> {
    return this.firestoreService.getSingle<Track>(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Promise<Object> {
    return this.firestoreService.updateSingle(id, updateTrackDto);
  }

  async like(
    id: string,
    userID: string,
    remove: boolean = false,
  ): Promise<Object> {
    // verify track exists
    const track = await this.getOne(id);
    if (!track) throw new NotFoundException(Track);

    // verify user exists
    const user = await this.usersService.getOne(userID);
    if (!user) throw new NotFoundException(User);

    // add tracklike
    const trackLike: TrackLike = {
      id: null,
      trackID: id,
      trackTitle: track.title,
      userID: userID,
      username: user.username,
    };
    await this.trackLikesService.create(trackLike);

    // add/remove like to/from track
    track.likes = (track.likes || 0) + (remove ? -1 : 1);
    const updatedTrack = (await this.update(id, track)) as Track;

    return updatedTrack
      ? {
          id: id,
          likes: updatedTrack.likes,
        }
      : null;
  }
}
