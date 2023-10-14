import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { MixesService } from '../mixes/mixes.service';
import { MixMapperService } from '../mixes/services/mix-mapper.service';
import { SubscribersService } from '../subscribers/subscribers.service';
import { ReleaseLike } from './entities/release-like.entity';
import { Release } from './entities/release.entity';
import { ReleaseMapperService } from './services/release-mapper.service';
import { CreateReleaseDto } from './dto/create-release.dto';
import { GetReleaseDto } from './dto/get-release.dto';

@Injectable()
export class ReleasesService {
  constructor(
    @Inject(ReleaseMapperService)
    private releaseMapper: ReleaseMapperService,
    @Inject(MixMapperService)
    private mixMapper: MixMapperService,
    @Inject(SubscribersService)
    private subscribersService: SubscribersService,
  ) {}

  async create(createReleaseDto: CreateReleaseDto): Promise<number> {
    // let release: Release = this.releaseRepository.create({
    //   title: createReleaseDto.title,
    //   releaseDate: createReleaseDto.releaseDate,
    // });

    // let createdRelease = await this.releaseRepository.save(release);
    // if (createdRelease) {
    //   return createdRelease.releaseId;
    // } else {
    //   throw new HttpException(
    //     'Error creating release.',
    //     HttpStatus.INTERNAL_SERVER_ERROR,
    //   );
    // }
    return 1;
  }

  async getAll(subscriberId: number): Promise<GetReleaseDto[]> {
    // if (subscriberId != null) {
    //   let releases = await this.releaseRepository.find({
    //     relations: ['likes', 'likes.subscriber'],
    //   });
    //   let likedReleases =
    //     await this.subscribersService.getAllReleasesLikedBySubscriber(
    //       subscriberId,
    //     );
    //   return this.releaseMapper.releasesToLikedReleaseDtos(
    //     releases,
    //     likedReleases,
    //   );
    // } else {
    //   let releases = await this.releaseRepository.find({
    //     relations: ['likes'],
    //   });
    //   return this.releaseMapper.releasesToGetReleaseDtos(releases);
    // }
    return new Array<GetReleaseDto>();
  }

  async getOne(releaseId: number, subscriberId?: number) {
    // let release = await this._findOne(releaseId);
    // // if a subscriberId is passed in, then we need to add like data to the returned release
    // if (subscriberId != null) {
    //   // get all liked releases so we can tell if our release is liked
    //   let likedReleases =
    //     await this.subscribersService.getAllReleasesLikedBySubscriber(
    //       subscriberId,
    //     );
    //   // map Release to LikedReleaseDto
    //   let likedReleaseDto = this.releaseMapper.releaseToLikedReleaseDto(
    //     release,
    //     likedReleases,
    //   );
    //   // get all liked mixes so we can tell if the release's
    //   // mixes are liked
    //   let likedMixes =
    //     await this.subscribersService.getAllMixesLikedBySubscriber(
    //       subscriberId,
    //     );
    //   // map the release's mixes array to LikedMixDto array
    //   likedReleaseDto.mixes = this.mixMapper.mixesToLikedMixDtos(
    //     release.mixes,
    //     likedMixes,
    //   );
    //   return likedReleaseDto;
    // } else {
    //   return this.releaseMapper.releaseToGetReleaseDto(release);
    // }
  }

  async createReleaseLike(releaseId: number, subscriberId: number) {
    // let release = await this._findOne(releaseId);
    // let subscriber = await this.subscribersService.findOne(subscriberId);
    // // first need to check if release is already liked by this subscriber
    // if (await this._findReleaseLike(releaseId, subscriberId)) {
    //   throw new HttpException('', HttpStatus.NO_CONTENT);
    // }
    // let releaseLike = this.releaseLikeRepository.create({
    //   release: release,
    //   subscriber: subscriber,
    // });
    // if (await this.releaseLikeRepository.save(releaseLike)) {
    //   return;
    // } else {
    //   throw new HttpException(
    //     'Error creating release like.',
    //     HttpStatus.INTERNAL_SERVER_ERROR,
    //   );
    // }
  }

  async removeReleaseLike(releaseId: number, subscriberId: number) {
    // let releaseLike = await this._findReleaseLike(releaseId, subscriberId);
    // // first need to check if release is liked by this subscriber
    // if (!releaseLike) {
    //   throw new HttpException(
    //     'Release is not currently liked by subscriber.',
    //     HttpStatus.NOT_FOUND,
    //   );
    // }
    // if (await this.releaseLikeRepository.delete(releaseLike.releaseLikeId)) {
    //   return;
    // } else {
    //   throw new HttpException(
    //     'Error removing release like.',
    //     HttpStatus.INTERNAL_SERVER_ERROR,
    //   );
    // }
  }

  async findOne(releaseId: number) {
    return await this._findOne(releaseId);
  }

  private async _findOne(releaseId: number) {
    // let release = await this.releaseRepository.findOne(releaseId, {
    //   relations: [
    //     'mixes',
    //     'mixes.release',
    //     'mixes.likes',
    //     'likes',
    //     'likes.subscriber',
    //   ],
    // });
    // if (!release) {
    //   throw new HttpException('Release not found.', HttpStatus.NOT_FOUND);
    // }
    // return release;
  }

  private async _findReleaseLike(releaseId: number, subscriberId: number) {
    // let release = await this._findOne(releaseId);
    // let releaseLike = release.likes.find(
    //   (like) => like.subscriber.subscriberId == subscriberId,
    // );
    // if (releaseLike) {
    //   return releaseLike;
    // } else {
    //   return null;
    // }
  }
}
