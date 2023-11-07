import { Inject, Injectable, NotImplementedException } from '@nestjs/common';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';
import { FirestoreService } from '../../services/database/firestore/firestore.service';

@Injectable()
export class SubscribersService {
  constructor(@Inject('users') private firestoreService: FirestoreService) {}

  // create new sub
  async create(createSubscriberDto: CreateSubscriberDto) {
    // if (
    //   await this.subscriberRepository.findOne({
    //     email: createSubscriberDto.email,
    //   })
    // ) {
    //   throw new HttpException(
    //     'Subscriber with this email already exists.',
    //     HttpStatus.BAD_REQUEST,
    //   );
    // }
    // let subscriber = this.subscriberRepository.create({
    //   email: createSubscriberDto.email,
    // });
    // let createdSubscriber = await this.subscriberRepository.save(subscriber);
    // if (createdSubscriber) {
    //   return createdSubscriber.subscriberId;
    // } else {
    //   throw new HttpException(
    //     'Error creating subscriber.',
    //     HttpStatus.INTERNAL_SERVER_ERROR,
    //   );
    // }
  }

  findAll() {
    //return this.subscriberRepository.find();
  }

  async findOne(subscriberId: number) {
    return await this._findOne(subscriberId);
  }

  update(subscriberId: number, updateSubscriberDto: UpdateSubscriberDto) {
    throw new NotImplementedException('Update subscriber not yet implemented');
  }

  async remove(subscriberId: number) {
    //return await this.subscriberRepository.delete(subscriberId);
  }

  async getAllTracksLikedBySubscriber(subscriberId: number) {
    // let subscriber = await this._findOne(subscriberId, [
    //   'trackLikes',
    //   'trackLikes.track',
    // ]);
    // let track: Track[] = [];
    // subscriber.trackLikes.forEach((like) => {
    //   track.push(like.track);
    // });
    // return track;
  }

  async getAllReleasesLikedBySubscriber(subscriberId: number) {
    // let subscriber = await this._findOne(subscriberId, [
    //   'releaseLikes',
    //   'releaseLikes.release',
    // ]);
    // let releases: Release[] = [];
    // subscriber.releaseLikes.forEach((like) => {
    //   releases.push(like.release);
    // });
    // return releases;
  }

  private async _findOne(subscriberId: number, relations?: string[]) {
    //   let subscriber = await this.subscriberRepository.findOne(subscriberId, {
    //     relations: relations,
    //   });
    //   if (subscriber) {
    //     return subscriber;
    //   } else {
    //     throw new HttpException('Subscriber not found.', HttpStatus.NOT_FOUND);
    //   }
  }
}
