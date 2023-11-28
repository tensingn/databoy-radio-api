import { Injectable, Type } from '@nestjs/common';
import { Music } from './entities/music.entity';
import {
  FirestoreService,
  QueryOptions,
} from '../database/firestore/firestore.service';
import { DatabaseObject } from '../database/models/database-object.entity';
import { MusicDto } from './dto/music.dto';
import { Dictionary } from '../database/models/dictionary';
import { Release } from '../../routes/releases/entities/release.entity';
import { Track } from '../../routes/tracks/entities/track.entity';
import { InjectCollectionByType } from '../database/firestore/firestore.decorators';
import { UpdateReleaseDto } from '../../routes/releases/dto/update-release.dto';
import { UpdateTrackDto } from '../../routes/tracks/dto/update-track.dto';

@Injectable()
export class MusicService {
  private types: Dictionary<Type> = {
    release: Release,
    track: Track,
  };

  constructor(
    @InjectCollectionByType(Music)
    private firestoreService: FirestoreService,
  ) {}

  getCollection<TMusic extends DatabaseObject>(
    query: QueryOptions,
  ): Promise<Array<TMusic>> {
    return this.firestoreService.getCollection(query);
  }

  async getSingle<TMusic extends Music>(
    id: string,
    type: string,
  ): Promise<TMusic> {
    const music: TMusic = await this.firestoreService.getSingle(id);
    if (music.type != type) {
      return null;
    }

    return music;
  }

  create<TMusic extends Music, TMusicDto extends MusicDto>(
    musicDto: TMusicDto,
  ): Promise<TMusic> {
    return this.firestoreService.addSingle<TMusic>(
      Object.assign(
        new this.types[musicDto.type].prototype.constructor(),
        musicDto,
      ),
    );
  }

  async update(
    id: string,
    musicDto: UpdateTrackDto | UpdateReleaseDto,
  ): Promise<Object> {
    const returnObj = {
      id,
      ...(await this.firestoreService.updateSingle(id, musicDto)),
    };
    return returnObj;
  }
}
