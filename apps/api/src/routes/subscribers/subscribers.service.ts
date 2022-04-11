import {
  HttpException,
  HttpStatus,
  Injectable,
  NotImplementedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MixLike } from '../mixes/entities/mix-like.entity';
import { Mix } from '../mixes/entities/mix.entity';
import { Release } from '../releases/entities/release.entity';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { Subscriber } from './entities/subscriber.entity';

@Injectable()
export class SubscribersService {
  constructor(
    @InjectRepository(Subscriber)
    private subscriberRepository: Repository<Subscriber>,
  ) {}

  async create(createSubscriberDto: CreateSubscriberDto) {
    let subscriber = this.subscriberRepository.create({
      email: createSubscriberDto.email,
    });

    if (await this.subscriberRepository.save(subscriber)) {
      return;
    } else {
      throw new HttpException(
        'Error creating subscriber.',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  findAll() {
    return this.subscriberRepository.find();
  }

  async findOne(subscriberId: number) {
    return await this._findOne(subscriberId);
  }

  update(subscriberId: number, updateSubscriberDto: UpdateSubscriberDto) {
    throw new NotImplementedException('Update subscriber not yet implemented');
  }

  remove(subscriberId: number) {
    throw new NotImplementedException('Remove subscriber not yet implemented');
  }

  async getAllMixesLikedBySubscriber(subscriberId: number) {
    let subscriber = await this._findOne(subscriberId, [
      'mixLikes',
      'mixLikes.mix',
    ]);

    let mixes: Mix[] = [];
    subscriber.mixLikes.forEach((like) => {
      mixes.push(like.mix);
    });

    return mixes;
  }

  async getAllReleasesLikedBySubscriber(subscriberId: number) {
    let subscriber = await this._findOne(subscriberId, [
      'releaseLikes',
      'releaseLikes.release',
    ]);

    let releases: Release[] = [];
    subscriber.releaseLikes.forEach((like) => {
      releases.push(like.release);
    });

    return releases;
  }

  private async _findOne(subscriberId: number, relations?: string[]) {
    let subscriber = await this.subscriberRepository.findOne(subscriberId, {
      relations: relations,
    });

    if (subscriber) {
      return subscriber;
    } else {
      throw new HttpException('Subscriber not found.', HttpStatus.NOT_FOUND);
    }
  }
}
