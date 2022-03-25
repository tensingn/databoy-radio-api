import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Release } from './entities/release.entity';

@Injectable()
export class ReleasesService {
  constructor(
    @InjectRepository(Release)
    private releaseRepository: Repository<Release>,
  ) {}

  findAll() {
    return this.releaseRepository.find({
      relations: ['mixes'],
    });
  }

  async findOne(releaseId: number) {
    let release = await this.releaseRepository.findOne(releaseId, {
      relations: ['mixes'],
    });
    if (!release) {
      throw new HttpException('Release not found.', HttpStatus.NOT_FOUND);
    }

    return release;
  }
}
