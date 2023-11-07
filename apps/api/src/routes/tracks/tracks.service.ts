import { Inject, Injectable } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './entities/track.entity';
import {
  FirestoreService,
  QueryOptions,
} from '../../services/database/firestore/firestore.service';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TracksService {
  constructor(
    @Inject(Track.collectionName)
    private firestoreService: FirestoreService,
  ) {}

  create(createTrackDto: CreateTrackDto): Promise<Track> {
    const track: Track = { id: null, ...createTrackDto };

    return this.firestoreService.addSingle<Track>(track);
  }

  getCollection(query: QueryOptions): Promise<Array<Track>> {
    return this.firestoreService.getCollection(query);
  }

  getOne(id: string): Promise<Track> {
    return this.firestoreService.getSingle<Track>(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Promise<Object> {
    return this.firestoreService.updateSingle(id, updateTrackDto, Track);
  }
}
