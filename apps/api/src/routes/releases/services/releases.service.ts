import { Inject, Injectable } from '@nestjs/common';
import {
  PagingOptions,
  QueryOptions,
  STANDARD,
} from '../../../services/database/firestore/firestore.service';
import { UsersService } from '../../users/services/users.service';
import { NotFoundException } from 'apps/api/src/exceptions/not-found.exception';
import { User } from '../../users/entities/user.entity';
import { Release } from '../entities/release.entity';
import { CreateReleaseDto } from '../dto/create-release.dto';
import { UpdateReleaseDto } from '../dto/update-release.dto';
import { LikesService } from 'apps/api/src/services/likes/likes.service';
import { ReleaseLike } from '../entities/release-like.entity';
import { MusicService } from 'apps/api/src/services/music/music.service';
import { Track } from '../../tracks/entities/track.entity';

@Injectable()
export class ReleasesService {
  constructor(
    @Inject(MusicService)
    private musicService: MusicService,
    @Inject(LikesService)
    private likesService: LikesService,
    @Inject(UsersService)
    private usersService: UsersService,
  ) {}

  create(createReleaseDto: CreateReleaseDto): Promise<Release> {
    return this.musicService.create(createReleaseDto);
  }

  getCollection(
    query: QueryOptions = ReleasesService.STANDARD_RELEASES,
  ): Promise<Array<Release | Release>> {
    return this.musicService.getCollection(query);
  }

  getOne(id: string, includeTracks: boolean = false): Promise<Release> {
    return includeTracks
      ? this.getOneWithTracks(id)
      : this.musicService.getSingle(id, Release.name.toLocaleLowerCase());
  }

  async getOneWithTracks(id: string): Promise<Release> {
    const [release, tracks] = await Promise.all([
      this.getOne(id),
      this.musicService.getCollection<Track>(this.queryTracksOfRelease(id)),
    ]);
    if (release && tracks) {
      release.tracks = tracks;
    }

    return release;
  }

  update(id: string, updateReleaseDto: UpdateReleaseDto): Promise<Object> {
    return this.musicService.update(
      id,
      Object.assign(updateReleaseDto, {
        type: Release.name.toLocaleLowerCase(),
      }),
    );
  }

  async like(
    id: string,
    userID: string,
    remove: boolean = false,
  ): Promise<Object> {
    // verify release exists
    const release = await this.getOne(id);
    if (!release) throw new NotFoundException(Release);

    // verify user exists
    const user = await this.usersService.getOne(userID);
    if (!user) throw new NotFoundException(User);

    // add/delete releaselike
    const releaseLike: ReleaseLike = Object.assign(new ReleaseLike(), {
      id: null,
      likedItemID: id,
      releaseTitle: release.title,
      userID: userID,
      username: user.username,
    });
    if (remove) {
      await this.likesService.delete(releaseLike);
    } else {
      await this.likesService.create(releaseLike);
    }

    // add/remove like to/from release
    const updateReleaseDto: UpdateReleaseDto = {
      numLikes: (release.numLikes || 0) + (remove ? -1 : 1),
    };
    const updatedRelease = (await this.update(id, updateReleaseDto)) as Release;

    return updatedRelease
      ? {
          id: id,
          numLikes: updatedRelease.numLikes,
        }
      : null;
  }

  getLikes(id: string): Promise<Array<ReleaseLike>> {
    return this.likesService.getCollection(
      LikesService.getQueryOptions(
        id,
        null,
        ReleaseLike.name.toLocaleLowerCase(),
      ),
    );
  }

  static STANDARD_RELEASES: QueryOptions = {
    whereOptions: {
      whereClauses: [
        {
          field: 'type',
          operation: '==',
          value: Release.name.toLocaleLowerCase(),
        },
      ],
      pagingOptions: STANDARD.pagingOptions,
    },
  };

  private queryTracksOfRelease(
    id: string,
    pagingOptions: PagingOptions = STANDARD.pagingOptions,
  ): QueryOptions {
    const query: QueryOptions = {
      whereOptions: {
        whereClauses: [
          {
            field: 'type',
            operation: '==',
            value: Track.name.toLocaleLowerCase(),
          },
          {
            field: 'releaseID',
            operation: '==',
            value: id,
          },
        ],
        operator: 'and',
        pagingOptions,
      },
    };
    return query;
  }
}
