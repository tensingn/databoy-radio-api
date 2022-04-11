import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
import { CreateMixLikeDto } from './dto/create-mix-like.dto';
import { MixesService } from './mixes.service';

@Controller('api/mixes')
export class MixesController {
  constructor(private readonly mixesService: MixesService) {}

  @Get()
  findAll(@Query('subscriberId') subscriberId: number) {
    return this.mixesService.findAll(subscriberId);
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
