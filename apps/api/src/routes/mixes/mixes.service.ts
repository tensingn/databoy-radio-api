import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MixLike } from './entities/mix-like.entity';
import { Mix } from './entities/mix.entity';

@Injectable()
export class MixesService {
  constructor(
    @InjectRepository(Mix)
    private mixRepository: Repository<Mix>,
    @InjectRepository(MixLike)
    private mixLikeRepository: Repository<MixLike>,
  ) {}

  findAll() {
    return this.mixRepository.find({
      relations: ['release'],
    });
  }

  async findOne(mixId: number) {
    let mix = await this.mixRepository.findOne(mixId, {
      relations: ['release'],
    });
    if (!mix) {
      throw new HttpException('Mix not found.', HttpStatus.NOT_FOUND);
    }

    return mix;
  }

  async createMixLike(mixId: number, subscriberId: any) {
    let mix = await this.findOne(mixId);
    let mixLike = this.mixLikeRepository.create({
      mix: mix,
      subscriberId: subscriberId,
    });

    return this.mixLikeRepository.save(mixLike);
  }
}
