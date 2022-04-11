import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { SubscribersService } from './subscribers.service';
import { CreateSubscriberDto } from './dto/create-subscriber.dto';
import { UpdateSubscriberDto } from './dto/update-subscriber.dto';

@Controller('api/subscribers')
export class SubscribersController {
  constructor(private readonly subscribersService: SubscribersService) {}

  @Post()
  create(@Body() createSubscriberDto: CreateSubscriberDto) {
    return this.subscribersService.create(createSubscriberDto);
  }

  @Get()
  findAll() {
    return this.subscribersService.findAll();
  }

  @Get(':subscriberId')
  findOne(@Param('subscriberId') subscriberId: number) {
    return this.subscribersService.findOne(+subscriberId);
  }

  @Patch(':subscriberId')
  update(
    @Param('subscriberId') subscriberId: number,
    @Body() updateSubscriberDto: UpdateSubscriberDto,
  ) {
    return this.subscribersService.update(+subscriberId, updateSubscriberDto);
  }

  @Delete(':subscriberId')
  remove(@Param('subscriberId') subscriberId: number) {
    return this.subscribersService.remove(+subscriberId);
  }

  @Get(':subscriberId/mixLikes')
  getAllMixLikesForSubscriber(@Param('subscriberId') subscriberId: number) {
    return this.subscribersService.getAllMixLikesForSubscriber(subscriberId);
  }

  @Get(':subscriberId/releaseLikes')
  getAllReleaseLikesForSubscriber(@Param('subscriberId') subscriberId: number) {
    return this.subscribersService.getAllReleaseLikesForSubscriber(
      subscriberId,
    );
  }
}
