import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Mix } from './entities/mix.entity';

@Injectable()
export class MixesService {
  // constructor(private dropboxService: DropboxService) {}
  constructor(
    @InjectRepository(Mix)
    private mixRepository: Repository<Mix>,
  ) {}

  findAll() {
    return this.mixRepository.find();
    // return this.dropboxService.list_folder();
  }

  async findOne(mixId: number) {
    let mix = await this.mixRepository.findOne(mixId);
    if (!mix) {
      throw new HttpException('Mix not found.', HttpStatus.NOT_FOUND);
    }

    return this.mixRepository.findOne(mixId);
  }
}
