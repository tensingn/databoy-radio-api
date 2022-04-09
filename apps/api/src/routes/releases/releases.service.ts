import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReleaseLike } from './entities/release-like.entity';
import { Release } from './entities/release.entity';

@Injectable()
export class ReleasesService {
  constructor(
    @InjectRepository(Release)
    private releaseRepository: Repository<Release>,
    @InjectRepository(ReleaseLike)
    private releaseLikeRepository: Repository<ReleaseLike>,
  ) {}

  findAll() {
    return this.releaseRepository.find({
      // relations: ['mixes'],
    });
  }

  async findOne(releaseId: number) {
    let release = await this.releaseRepository.findOne(releaseId, {
      relations: ['mixes', 'mixes.release'],
    });
    if (!release) {
      throw new HttpException('Release not found.', HttpStatus.NOT_FOUND);
    }

    return release;
  }

  async createReleaseLike(releaseId: number, subscriberId: any) {
    let release = await this.findOne(releaseId);
    let releaseLike = this.releaseLikeRepository.create({
      release: release,
      subscriberId: subscriberId,
    });

    return this.releaseLikeRepository.save(releaseLike);
  }
}
