import { Module } from '@nestjs/common';
import { ReleasesService } from './releases.service';
import { ReleasesController } from './releases.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Release } from './entities/release.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Release])],
  controllers: [ReleasesController],
  providers: [ReleasesService],
})
export class ReleasesModule {}
