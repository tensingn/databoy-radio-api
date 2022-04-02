import { Module } from '@nestjs/common';
import { MixesService } from './mixes.service';
import { MixesController } from './mixes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mix } from './entities/mix.entity';
import { StorageService } from '../../services/storage/storage.service';

@Module({
  imports: [TypeOrmModule.forFeature([Mix])],
  controllers: [MixesController],
  providers: [MixesService, StorageService],
})
export class MixesModule {}
