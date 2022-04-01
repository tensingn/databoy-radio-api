import { Controller, Get, Param } from '@nestjs/common';
import { MixesService } from './mixes.service';

@Controller('api/mixes')
export class MixesController {
  constructor(private readonly mixesService: MixesService) {}

  @Get()
  findAll() {
    return this.mixesService.findAll();
  }

  // @Get(':id/src')
  // findOneSrc(@Param('id') id: string) {
  //   return this.mixesService.findOneSrc(+id);
  // }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mixesService.findOne(+id);
  }
}
