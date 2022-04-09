import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ReleaseLike } from './entities/release-like.entity';
import { Release } from './entities/release.entity';
import { ReleaseMapperService } from './services/release-mapper.service';

@Injectable()
export class ReleasesService {
  constructor(
    @InjectRepository(Release)
    private releaseRepository: Repository<Release>,
    @InjectRepository(ReleaseLike)
    private releaseLikeRepository: Repository<ReleaseLike>,
    @Inject(ReleaseMapperService)
    private releaseMapper: ReleaseMapperService,
  ) {}

  async findAll() {
    let releases = await this.releaseRepository.find({
      relations: ['mixes', 'likes'],
    });

    return this.releaseMapper.releasesToGetReleaseDtos(releases);
  }

  async findOne(releaseId: number) {
    let release = await this._findOne(releaseId);

    return this.releaseMapper.releaseToGetReleaseDto(release);
  }

  async createReleaseLike(releaseId: number, subscriberId: any) {
    let release = await this._findOne(releaseId);
    let releaseLike = this.releaseLikeRepository.create({
      release: release,
      subscriberId: subscriberId,
    });

    return this.releaseLikeRepository.save(releaseLike);
  }

  private async _findOne(releaseId: number) {
    let release = await this.releaseRepository.findOne(releaseId, {
      relations: ['mixes', 'mixes.release', 'likes'],
    });
    if (!release) {
      throw new HttpException('Release not found.', HttpStatus.NOT_FOUND);
    }

    return release;
  }
}
