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
      relations: ['likes'],
    });

    return this.releaseMapper.releasesToGetReleaseDtos(releases);
  }

  async findOne(releaseId: number) {
    let release = await this._findOne(releaseId);

    return this.releaseMapper.releaseToGetReleaseDto(release);
  }

  async createReleaseLike(releaseId: number, subscriberId: any) {
    let release = await this._findOne(releaseId);

    // first need to check if release is already liked by this subscriber
    if (await this._findReleaseLike(releaseId, subscriberId)) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }

    let releaseLike = this.releaseLikeRepository.create({
      release: release,
      subscriberId: subscriberId,
    });

    if (await this.releaseLikeRepository.save(releaseLike)) {
      return;
    } else {
      throw new HttpException(
        'Error creating release like.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeReleaseLike(releaseId: number, subscriberId: number) {
    let releaseLike = await this._findReleaseLike(releaseId, subscriberId);

    // first need to check if release is liked by this subscriber
    if (!releaseLike) {
      throw new HttpException(
        'Release is not currently liked by subscriber.',
        HttpStatus.NOT_FOUND,
      );
    }

    if (await this.releaseLikeRepository.delete(releaseLike.releaseLikeId)) {
      return;
    } else {
      throw new HttpException(
        'Error removing release like.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async _findOne(releaseId: number) {
    let release = await this.releaseRepository.findOne(releaseId, {
      relations: ['mixes', 'mixes.release', 'mixes.likes', 'likes'],
    });
    if (!release) {
      throw new HttpException('Release not found.', HttpStatus.NOT_FOUND);
    }

    return release;
  }

  private async _findReleaseLike(releaseId: number, subscriberId: number) {
    let release = await this._findOne(releaseId);
    let releaseLike = release.likes.find(
      (like) => like.subscriberId == subscriberId,
    );
    if (releaseLike) {
      return releaseLike;
    } else {
      return null;
    }
  }
}
