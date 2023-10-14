import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { SubscribersService } from '../subscribers/subscribers.service';
import { MixLike } from './entities/mix-like.entity';
import { Mix } from './entities/mix.entity';
import { MixMapperService } from './services/mix-mapper.service';
import { CreateMixDto } from './dto/create-mix.dto';
import { Release } from '../releases/entities/release.entity';
import { ReleasesService } from '../releases/releases.service';
import { Subscriber } from '../subscribers/entities/subscriber.entity';

@Injectable()
export class MixesService {
  constructor(
    @Inject(MixMapperService)
    private mixMapper: MixMapperService,
    @Inject(SubscribersService)
    private subscribersService: SubscribersService,
  ) {}

  async create(createMixDto: CreateMixDto): Promise<number> {
    return 1;
    // let release = createMixDto.releaseId
    //   ? await this.releaseRepository.findOne(createMixDto.releaseId)
    //   : null;
    // let mix: Mix = this.mixRepository.create({
    //   title: createMixDto.title,
    //   release: release,
    //   src: createMixDto.src,
    // });
    // let createdMix = await this.mixRepository.save(mix);
    // if (createdMix) {
    //   return createdMix.mixId;
    // } else {
    //   throw new HttpException(
    //     'Error creating mix.',
    //     HttpStatus.INTERNAL_SERVER_ERROR,
    //   );
    // }
  }

  async getAll(subscriberId: number) {
    // if (subscriberId == null) {
    //   let mixes = await this.mixRepository.find({
    //     relations: ['release', 'likes'],
    //   });
    //   return this.mixMapper.mixesToGetMixDtos(mixes);
    // } else {
    //   let mixes = await this.mixRepository.find({
    //     relations: ['release', 'likes'],
    //   });
    //   let likedMixes =
    //     await this.subscribersService.getAllMixesLikedBySubscriber(
    //       subscriberId,
    //     );
    //   return this.mixMapper.mixesToLikedMixDtos(mixes, likedMixes);
    // }
  }

  async getOne(mixId: number) {
    // let mix = await this.findOne(mixId);
    // return this.mixMapper.mixToGetMixDto(mix);
  }

  async findOne(mixId: number) {
    return await this._findOne(mixId);
  }

  async createMixLike(mixId: number, subscriberId: number) {
    // let mix = await this._findOne(mixId);
    // let subscriber = await this.subscribersService.findOne(subscriberId);
    // // first need to check if mix is already liked by this subscriber
    // if (await this._findMixLike(mixId, subscriber.subscriberId)) {
    //   throw new HttpException('', HttpStatus.NO_CONTENT);
    // }
    // let mixLike = this.mixLikeRepository.create({
    //   mix: mix,
    //   subscriber: subscriber,
    // });
    // if (await this.mixLikeRepository.save(mixLike)) {
    //   return;
    // } else {
    //   throw new HttpException(
    //     'Error creating mix like.',
    //     HttpStatus.INTERNAL_SERVER_ERROR,
    //   );
    // }
  }

  async removeMixLike(mixId: number, subscriberId: number) {
    // let mixLike = await this._findMixLike(mixId, subscriberId);
    // // first need to check if mix is liked by this subscriber
    // if (!mixLike) {
    //   throw new HttpException(
    //     'Mix is not currently liked by subscriber.',
    //     HttpStatus.NOT_FOUND,
    //   );
    // }
    // if (await this.mixLikeRepository.delete(mixLike.mixLikeId)) {
    //   return;
    // } else {
    //   throw new HttpException(
    //     'Error removing mix like.',
    //     HttpStatus.INTERNAL_SERVER_ERROR,
    //   );
    // }
  }

  private async _findOne(mixId: number) {
    // let mix = await this.mixRepository.findOne(mixId, {
    //   relations: ['release', 'likes', 'likes.subscriber'],
    // });
    // if (!mix) {
    //   throw new HttpException('Mix not found.', HttpStatus.NOT_FOUND);
    // }
    // return mix;
  }

  private async _findMixLike(mixId: number, subscriberId: number) {
    // let mix = await this._findOne(mixId);
    // let mixLike = mix.likes.find(
    //   (like) => like.subscriber.subscriberId == subscriberId,
    // );
    // if (mixLike) {
    //   return mixLike;
    // } else {
    //   return null;
    // }
  }
}
