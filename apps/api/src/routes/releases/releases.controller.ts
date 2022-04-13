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

@Controller('api/releases')
export class ReleasesController {
  constructor(private readonly releasesService: ReleasesService) {}

  @Get()
  findAll(@Query('subscriberId') subscriberId: number) {
    return this.releasesService.findAll(subscriberId);
  }

  @Get(':releaseId')
  findOne(
    @Param('releaseId') releaseId: number,
    @Query('subscriberId') subscriberId: number,
  ) {
    return this.releasesService.findOne(+releaseId, subscriberId);
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
