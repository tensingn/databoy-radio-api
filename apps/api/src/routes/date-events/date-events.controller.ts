import { Controller, Get, Param, Query } from '@nestjs/common';
import { DateEventsService } from './date-events.service';

@Controller('api/date-events')
export class DateEventsController {
  constructor(private readonly dateEventsService: DateEventsService) {}

  @Get()
  findAll(@Query('daysAgo') daysAgo: number) {
    return this.dateEventsService.findAll(daysAgo);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dateEventsService.findOne(+id);
  }
}
