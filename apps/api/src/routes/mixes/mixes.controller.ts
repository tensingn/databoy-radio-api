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
import { CreateMixDto } from './dto/create-mix.dto';

@Controller('api/mixes')
export class MixesController {
  constructor(private readonly mixesService: MixesService) {}

  @Post()
  create(@Body() createMixDto: CreateMixDto) {
    return this.mixesService.create(createMixDto);
  }

  @Get()
  getAll(@Query('subscriberId') subscriberId: number) {
    return this.mixesService.getAll(subscriberId);
  }

  @Get(':mixId')
  getOne(@Param('mixId') mixId: number) {
    return this.mixesService.getOne(+mixId);
  }

  @Post(':mixId/likes')
  createMixLike(@Param('mixId') mixId: number, @Body() body: CreateMixLikeDto) {
    return this.mixesService.createMixLike(+mixId, body.subscriberId);
  }

  @Delete(':mixId/likes')
  deleteMixLike(
    @Param('mixId') mixId: number,
    @Query('subscriberId') subscriberId: number,
  ) {
    return this.mixesService.removeMixLike(+mixId, +subscriberId);
  }
}
