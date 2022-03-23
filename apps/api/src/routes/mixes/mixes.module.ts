import { Module } from '@nestjs/common';
import { MixesService } from './mixes.service';
import { MixesController } from './mixes.controller';
import { DropboxService } from '../../services/dropbox/dropbox.service';

@Module({
  controllers: [MixesController],
  providers: [MixesService, DropboxService],
})
export class MixesModule {}
