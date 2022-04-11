import { Injectable } from '@nestjs/common';
import { GetMixDto } from '../dto/get-mix.dto';
import { LikedMixDto } from '../dto/liked-mix.dto';
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

  mixesToLikedMixDtos(mixes: Mix[], likedMixes: Mix[]): LikedMixDto[] {
    let dtos: LikedMixDto[] = [];

    mixes.forEach((mix) => {
      let mixDto = this.mixToGetMixDto(mix);
      let likedMix = likedMixes.find((lm) => lm.mixId == mix.mixId);
      if (likedMix) {
        dtos.push({
          ...mixDto,
          isLiked: true,
        });
      } else {
        dtos.push({
          ...mixDto,
          isLiked: false,
        });
      }
    });

    return dtos;
  }
}
