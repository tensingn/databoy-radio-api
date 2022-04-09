import { Injectable } from '@nestjs/common';
import { GetMixDto } from '../dto/get-mix.dto';
import { Mix } from '../entities/mix.entity';

@Injectable()
export class MixMapperService {
  mixToGetMixDto(mix: Mix): GetMixDto {
    let dto: GetMixDto = new GetMixDto();

    dto.mixId = mix.mixId;
    dto.release = mix.release;
    dto.title = mix.title;
    dto.likes = mix.likes.length;
    dto.src = mix.src;

    return dto;
  }

  mixesToGetMixDtos(mixs: Mix[]): GetMixDto[] {
    let dtos: GetMixDto[] = [];
    mixs.forEach((mix) => {
      dtos.push(this.mixToGetMixDto(mix));
    });

    return dtos;
  }
}
