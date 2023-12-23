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
import { AddTracksToReleaseDto } from '../dto/add-tracks-to-release.dto';
import { Music } from 'apps/api/src/services/music/entities/music.entity';
import { UpdateTrackDto } from '../../tracks/dto/update-track.dto';
import { AlreadyExistsException } from 'apps/api/src/exceptions/already-exists.exception';
import { Dictionary } from 'apps/api/src/services/database/models/dictionary';

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
    includeTracks: boolean = false,
  ): Promise<Array<Release>> {
    return includeTracks
      ? this.getCollectionWithTracks()
      : this.musicService.getCollection(query);
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

  async getCollectionWithTracks(): Promise<Array<Release>> {
    const [releases, tracks] = await Promise.all([
      this.getCollection(ReleasesService.STANDARD_RELEASES, false),
      this.musicService.getCollection<Track>(this.queryTracksWithReleaseID()),
    ]);

    const releaseDict: Dictionary<Release> = {};
    releases.forEach((r) => (releaseDict[r.id] = r));

    tracks.forEach((t) => {
      const release = releaseDict[t.releaseID];
      if (release && !release.tracks) {
        release.tracks = new Array<Track>();
      }
      release?.tracks.push(t);
    });

    return releases;
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

  async addTracksToRelease(
    id: string,
    addTracksToReleaseDto: AddTracksToReleaseDto,
  ): Promise<Array<Object>> {
    const music: Array<Music> = await this.musicService.getCollection(
      MusicService.queryMultipleItemsByID([
        id,
        ...addTracksToReleaseDto.tracks,
      ]),
    );

    const release = music.find(
      (m) => m.type === Release.name.toLocaleLowerCase() && m.id === id,
    ) as Release;
    const tracks = music.filter(
      (m) => m.type === Track.name.toLocaleLowerCase(),
    ) as Array<Track>;

    if (!release) throw new NotFoundException(Release);
    if (!tracks || tracks.length !== addTracksToReleaseDto.tracks.length)
      throw new NotFoundException(Track, 'Not all tracks were found.');

    const indexOfTrackWithRelease = tracks.findIndex((t) => t.releaseID);
    if (indexOfTrackWithRelease != -1) {
      throw new AlreadyExistsException(
        Track,
        `Track ${tracks[indexOfTrackWithRelease].id} is already part of Release ${tracks[indexOfTrackWithRelease].releaseID}.`,
      );
    }

    const updateTrackObjects: Array<{ id: string; data: UpdateTrackDto }> =
      tracks.map((t) => {
        return {
          id: t.id,
          data: {
            type: Track.name.toLocaleLowerCase(),
            releaseID: id,
          },
        };
      });

    return (await this.musicService.updateMany(updateTrackObjects)).map((t) => {
      return {
        id: t.id,
        releaseID: (t.data as Track).releaseID,
      };
    });
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

  private queryTracksWithReleaseID(
    pagingOptions: PagingOptions = STANDARD.pagingOptions,
  ): QueryOptions {
    const query: QueryOptions = {
      whereOptions: {
        whereClauses: [
          {
            field: 'releaseID',
            operation: '!=',
            value: '',
          },
        ],
        operator: 'and',
        pagingOptions,
      },
    };
    return query;
  }
}
