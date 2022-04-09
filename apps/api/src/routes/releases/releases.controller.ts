import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateReleaseLikeDto } from './dto/create-release-like.dto';
import { ReleasesService } from './releases.service';

@Controller('api/releases')
export class ReleasesController {
  constructor(private readonly releasesService: ReleasesService) {}

  @Get()
  findAll() {
    return this.releasesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.releasesService.findOne(+id);
  }

  @Post(':id/likes')
  createreleaseLike(
    @Param('id') id: number,
    @Body() body: CreateReleaseLikeDto,
  ) {
    return this.releasesService.createReleaseLike(+id, body.subscriberId);
  }
}
