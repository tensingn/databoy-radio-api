import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SubscribersService } from '../subscribers/subscribers.service';
import { MixLike } from './entities/mix-like.entity';
import { Mix } from './entities/mix.entity';
import { MixMapperService } from './services/mix-mapper.service';

@Injectable()
export class MixesService {
  constructor(
    @InjectRepository(Mix)
    private mixRepository: Repository<Mix>,
    @InjectRepository(MixLike)
    private mixLikeRepository: Repository<MixLike>,
    @Inject(MixMapperService)
    private mixMapper: MixMapperService,
    @Inject(SubscribersService)
    private subscribersService: SubscribersService,
  ) {}

  async findAll(subscriberId: number) {
    if (subscriberId == null) {
      let mixes = await this.mixRepository.find({
        relations: ['release', 'likes'],
      });

      return this.mixMapper.mixesToGetMixDtos(mixes);
    } else {
      let mixes = await this.mixRepository.find({
        relations: ['release', 'likes'],
      });
      let likedMixes =
        await this.subscribersService.getAllMixesLikedBySubscriber(
          subscriberId,
        );

      return this.mixMapper.mixesToLikedMixDtos(mixes, likedMixes);
    }
  }

  async findOne(mixId: number) {
    let mix = await this._findOne(mixId);

    return this.mixMapper.mixToGetMixDto(mix);
  }

  async createMixLike(mixId: number, subscriberId: number) {
    let mix = await this._findOne(mixId);
    let subscriber = await this.subscribersService.findOne(subscriberId);

    // first need to check if mix is already liked by this subscriber
    if (await this._findMixLike(mixId, subscriber.subscriberId)) {
      throw new HttpException('', HttpStatus.NO_CONTENT);
    }

    let mixLike = this.mixLikeRepository.create({
      mix: mix,
      subscriber: subscriber,
    });

    if (await this.mixLikeRepository.save(mixLike)) {
      return;
    } else {
      throw new HttpException(
        'Error creating mix like.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async removeMixLike(mixId: number, subscriberId: number) {
    let mixLike = await this._findMixLike(mixId, subscriberId);

    // first need to check if mix is liked by this subscriber
    if (!mixLike) {
      throw new HttpException(
        'Mix is not currently liked by subscriber.',
        HttpStatus.NOT_FOUND,
      );
    }

    if (await this.mixLikeRepository.delete(mixLike.mixLikeId)) {
      return;
    } else {
      throw new HttpException(
        'Error removing mix like.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  private async _findOne(mixId: number) {
    let mix = await this.mixRepository.findOne(mixId, {
      relations: ['release', 'likes', 'likes.subscriber'],
    });
    if (!mix) {
      throw new HttpException('Mix not found.', HttpStatus.NOT_FOUND);
    }

    return mix;
  }

  private async _findMixLike(mixId: number, subscriberId: number) {
    let mix = await this._findOne(mixId);
    let mixLike = mix.likes.find(
      (like) => like.subscriber.subscriberId == subscriberId,
    );
    if (mixLike) {
      return mixLike;
    } else {
      return null;
    }
  }
}
