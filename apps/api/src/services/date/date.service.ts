import { Injectable } from '@nestjs/common';

@Injectable()
export class DateService {
  today(): Date {
    return new Date(Date.now());
  }

  todayNoTime(): Date {
    let today = this.today();
    return new Date(today.getFullYear(), today.getMonth(), today.getDate());
  }

  daysAgo(numDaysAgo: number): Date {
    return new Date(Date.now() - numDaysAgo * 24 * 60 * 60 * 1000);
  }

  daysAgoNoTime(numDaysAgo: number): Date {
    let date = this.daysAgo(numDaysAgo);
    return new Date(date.getFullYear(), date.getMonth(), date.getDate());
  }
}
