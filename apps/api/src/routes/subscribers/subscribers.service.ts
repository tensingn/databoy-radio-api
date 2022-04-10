import {
  HttpException,
  HttpStatus,
  Injectable,
  NotImplementedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
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

  update(id: number, updateSubscriberDto: UpdateSubscriberDto) {
    throw new NotImplementedException('Update subscriber not yet implemented');
  }

  remove(id: number) {
    throw new NotImplementedException('Remove subscriber not yet implemented');
  }

  private async _findOne(subscriberId: number) {
    let subscriber = await this.subscriberRepository.findOne(subscriberId);

    if (subscriber) {
      return subscriber;
    } else {
      throw new HttpException('Subscriber not found.', HttpStatus.NOT_FOUND);
    }
  }
}
