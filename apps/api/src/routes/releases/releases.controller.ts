import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateReleaseLikeDto } from './dto/create-release-like.dto';
import { ReleasesService } from './releases.service';
import { CreateReleaseDto } from './dto/create-release.dto';

@Controller('api/releases')
export class ReleasesController {
  constructor(private readonly releasesService: ReleasesService) {}

  @Post()
  create(@Body() body: CreateReleaseDto) {
    return this.releasesService.create(body);
  }

  @Get()
  getAll(@Query('subscriberId') subscriberId: number) {
    return this.releasesService.getAll(subscriberId);
  }

  @Get(':releaseId')
  getOne(
    @Param('releaseId') releaseId: number,
    @Query('subscriberId') subscriberId: number,
  ) {
    return this.releasesService.getOne(+releaseId, subscriberId);
  }

  @Post(':releaseId/likes')
  createreleaseLike(
    @Param('releaseId') releaseId: number,
    @Body() body: CreateReleaseLikeDto,
  ) {
    return this.releasesService.createReleaseLike(
      +releaseId,
      body.subscriberId,
    );
  }

  @Delete(':releaseId/likes')
  deleteReleaseLike(
    @Param('releaseId') releaseId: number,
    @Query('subscriberId') subscriberId: number,
  ) {
    return this.releasesService.removeReleaseLike(+releaseId, +subscriberId);
  }
}
