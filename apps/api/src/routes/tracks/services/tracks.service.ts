import { Inject, Injectable } from '@nestjs/common';
import { CreateTrackDto } from '../dto/create-track.dto';
import { Track } from '../entities/track.entity';
import { QueryOptions } from '../../../services/database/firestore/firestore.service';
import { UpdateTrackDto } from '../dto/update-track.dto';
import { UsersService } from '../../users/services/users.service';
import { TrackLike } from '../entities/track-like.entity';
import { NotFoundException } from 'apps/api/src/exceptions/not-found.exception';
import { User } from '../../users/entities/user.entity';
import { Release } from '../../releases/entities/release.entity';
import { LikesService } from 'apps/api/src/services/likes/likes.service';
import { MusicService } from 'apps/api/src/services/music/music.service';

@Injectable()
export class TracksService {
  constructor(
    @Inject(MusicService)
    private musicService: MusicService,
    @Inject(LikesService)
    private likesService: LikesService,
    @Inject(UsersService)
    private usersService: UsersService,
  ) {}

  create(createTrackDto: CreateTrackDto): Promise<Track> {
    return this.musicService.create(createTrackDto);
  }

  getCollection(
    query: QueryOptions = TracksService.STANDARD_TRACKS,
  ): Promise<Array<Track>> {
    return this.musicService.getCollection(query);
  }

  getOne(id: string): Promise<Track | Release> {
    return this.musicService.getSingle<Track>(
      id,
      Track.name.toLocaleLowerCase(),
    );
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Promise<Object> {
    return this.musicService.update(
      id,
      Object.assign(updateTrackDto, { type: Track.name.toLocaleLowerCase() }),
    );
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

    // add/delete tracklike
    const trackLike: TrackLike = Object.assign(new TrackLike(), {
      id: null,
      likedItemID: id,
      trackTitle: track.title,
      userID: userID,
      username: user.username,
    });
    if (remove) {
      await this.likesService.delete(trackLike);
    } else {
      await this.likesService.create(trackLike);
    }

    // add/remove like to/from track
    const updateTrackDto: UpdateTrackDto = {
      numLikes: (track.numLikes || 0) + (remove ? -1 : 1),
    };
    const updatedTrack = (await this.update(id, updateTrackDto)) as Track;

    return updatedTrack
      ? {
          id: id,
          numLikes: updatedTrack.numLikes,
        }
      : null;
  }

  getLikes(id: string): Promise<Array<TrackLike>> {
    return this.likesService.getCollection(
      LikesService.getQueryOptions(
        id,
        null,
        TrackLike.name.toLocaleLowerCase(),
      ),
    );
  }

  static STANDARD_TRACKS: QueryOptions = {
    whereOptions: {
      whereClauses: [
        {
          field: 'type',
          operation: '==',
          value: Track.name.toLocaleLowerCase(),
        },
      ],
      pagingOptions: {
        startAfter: null,
        limit: 10,
      },
    },
  };
}
