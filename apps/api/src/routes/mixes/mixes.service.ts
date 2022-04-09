import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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
  ) {}

  async findAll() {
    let mixes = await this.mixRepository.find({
      relations: ['release', 'likes'],
    });

    return this.mixMapper.mixesToGetMixDtos(mixes);
  }

  async findOne(mixId: number) {
    let mix = await this._findOne(mixId);

    return this.mixMapper.mixToGetMixDto(mix);
  }

  async createMixLike(mixId: number, subscriberId: any) {
    let mix = await this._findOne(mixId);
    let mixLike = this.mixLikeRepository.create({
      mix: mix,
      subscriberId: subscriberId,
    });

    return this.mixLikeRepository.save(mixLike);
  }

  private async _findOne(mixId: number) {
    let mix = await this.mixRepository.findOne(mixId, {
      relations: ['release', 'likes'],
    });
    if (!mix) {
      throw new HttpException('Mix not found.', HttpStatus.NOT_FOUND);
    }

    return mix;
  }
}
