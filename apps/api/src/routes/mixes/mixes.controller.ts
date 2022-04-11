import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateMixLikeDto } from './dto/create-mix-like.dto';
import { MixesService } from './mixes.service';

@Controller('api/mixes')
export class MixesController {
  constructor(private readonly mixesService: MixesService) {}

  @Get()
  findAll() {
    return this.mixesService.findAll();
  }

  @Get(':mixId')
  findOne(@Param('mixId') mixId: number) {
    return this.mixesService.findOne(+mixId);
  }

  @Post(':mixId/likes')
  createMixLike(@Param('mixId') mixId: number, @Body() body: CreateMixLikeDto) {
    return this.mixesService.createMixLike(+mixId, body.subscriberId);
  }

  @Delete(':mixId/likes/:subscriberId')
  deleteMixLike(
    @Param('mixId') mixId: number,
    @Param('subscriberId') subscriberId: number,
  ) {
    return this.mixesService.removeMixLike(+mixId, +subscriberId);
  }
}
