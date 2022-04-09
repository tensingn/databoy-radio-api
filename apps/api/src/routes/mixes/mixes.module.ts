import { Module } from '@nestjs/common';
import { MixesService } from './mixes.service';
import { MixesController } from './mixes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Mix } from './entities/mix.entity';
import { MixLike } from './entities/mix-like.entity';
import { MixMapperService } from './services/mix-mapper.service';

@Module({
  imports: [TypeOrmModule.forFeature([Mix, MixLike])],
  controllers: [MixesController],
  providers: [MixesService, MixMapperService],
})
export class MixesModule {}
