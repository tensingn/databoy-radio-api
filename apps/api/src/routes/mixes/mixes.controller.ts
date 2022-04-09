import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateMixLikeDto } from './dto/create-mix-like.dto';
import { MixesService } from './mixes.service';

@Controller('api/mixes')
export class MixesController {
  constructor(private readonly mixesService: MixesService) {}

  @Get()
  findAll() {
    return this.mixesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mixesService.findOne(+id);
  }

  @Post(':id/likes')
  createMixLike(@Param('id') id: number, @Body() body: CreateMixLikeDto) {
    return this.mixesService.createMixLike(+id, body.subscriberId);
  }
}
