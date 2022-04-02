import { Controller, Get, Header, Param } from '@nestjs/common';
import { MixesService } from './mixes.service';

@Controller('api/mixes')
export class MixesController {
  constructor(private readonly mixesService: MixesService) {}

  @Get()
  findAll() {
    return this.mixesService.findAll();
  }

  @Get('file')
  @Header('content-type', 'audio/mp4')
  findAudioByFileName() {
    let fileName = 'Release 1 - Mix 1.m4a';
    return this.mixesService.findAudioFileByName(fileName);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.mixesService.findOne(+id);
  }
}
