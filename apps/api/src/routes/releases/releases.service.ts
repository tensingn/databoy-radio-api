import { Injectable } from '@nestjs/common';

@Injectable()
export class ReleasesService {
  findAll() {
    return `This action returns all releases`;
  }

  findOne(id: number) {
    return `This action returns a #${id} release`;
  }
}
