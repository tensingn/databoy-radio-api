import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { TracksService } from './tracks.service';
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
  getCollection(@Body() query: QueryOptions) {
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
}
