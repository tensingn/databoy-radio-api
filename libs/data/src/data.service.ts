import { Injectable } from '@nestjs/common';

@Injectable()
export class DataService {
  count: number = 0;

  testMethod(): void {
    this.count++;
    console.log(`hello from data service`);
  }
}
