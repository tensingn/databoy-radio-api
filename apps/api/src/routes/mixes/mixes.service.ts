import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { StorageService } from '../../services/storage/storage.service';
import { Mix } from './entities/mix.entity';

@Injectable()
export class MixesService {
  constructor(
    @InjectRepository(Mix)
    private mixRepository: Repository<Mix>,
    private storageService: StorageService,
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

  findAudioFileByName(mixName: string) {
    return this.storageService.getObject(mixName);
  }
}
