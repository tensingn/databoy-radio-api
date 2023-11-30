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
import { CreateReleaseDto } from './dto/create-release.dto';
import { ReleasesService } from './services/releases.service';
import { QueryOptions } from '../../services/database/firestore/firestore.service';
import { UpdateReleaseDto } from './dto/update-release.dto';
import { TransformBooleanPipe } from '../../pipes/transform-boolean.pipe';
import { AddTracksToReleaseDto } from './dto/add-tracks-to-release.dto';

@Controller('api/releases')
export class ReleasesController {
  constructor(private readonly releasesService: ReleasesService) {}

  @Post()
  create(@Body() createReleaseDto: CreateReleaseDto) {
    return this.releasesService.create(createReleaseDto);
  }

  @Get()
  getCollection(
    @Query('startAfter') startAfter: string = null,
    @Query('limit') limit: number = 10,
  ) {
    let query: QueryOptions = ReleasesService.STANDARD_RELEASES;
    return this.releasesService.getCollection(query);
  }

  @Get(':id')
  getOne(
    @Param('id') id: string,
    @Query('includeTracks', new TransformBooleanPipe()) includeTracks: boolean,
  ) {
    return this.releasesService.getOne(id, includeTracks);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateReleaseDto: UpdateReleaseDto) {
    return this.releasesService.update(id, updateReleaseDto);
  }

  @Post(':id/likes/:userID')
  like(@Param('id') id: string, @Param('userID') userID: string) {
    return this.releasesService.like(id, userID);
  }

  @Delete(':id/likes/:userID')
  unlike(@Param('id') id: string, @Param('userID') userID: string) {
    return this.releasesService.like(id, userID, true);
  }

  @Get(':id/likes')
  getLikes(@Param('id') id: string) {
    return this.releasesService.getLikes(id);
  }

  @Post(':id/tracks')
  addTracksToRelease(
    @Param('id') id: string,
    @Body() addTracksToReleaseDto: AddTracksToReleaseDto,
  ) {
    return this.releasesService.addTracksToRelease(id, addTracksToReleaseDto);
  }
}
