import { Module } from '@nestjs/common';
import { MixesService } from './mixes.service';
import { MixesController } from './mixes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mix } from './entities/mix.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Mix])],
  controllers: [MixesController],
  providers: [MixesService],
})
export class MixesModule {}
