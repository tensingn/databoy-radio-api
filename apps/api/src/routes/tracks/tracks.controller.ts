import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { TracksService } from './services/tracks.service';
import { QueryOptions } from '../../services/database/firestore/firestore.service';
import { UpdateTrackDto } from './dto/update-track.dto';

@Controller('api/tracks')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @Get()
  getCollection(
    @Query('startAfter') startAfter: string = null,
    @Query('limit') limit: number = 10,
  ) {
    // TODO - implement paging
    let query: QueryOptions = TracksService.STANDARD_TRACKS;
    return this.tracksService.getCollection(query);
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.tracksService.getOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTrackDto: UpdateTrackDto) {
    return this.tracksService.update(id, updateTrackDto);
  }

  @Post(':id/likes/:userID')
  like(@Param('id') id: string, @Param('userID') userID: string) {
    return this.tracksService.like(id, userID);
  }

  @Delete(':id/likes/:userID')
  unlike(@Param('id') id: string, @Param('userID') userID: string) {
    return this.tracksService.like(id, userID, true);
  }

  @Get(':id/likes')
  getLikes(@Param('id') id: string) {
    return this.tracksService.getLikes(id);
  }
}
