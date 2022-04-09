import { Inject, Injectable } from '@nestjs/common';
import { MixMapperService } from '../../mixes/services/mix-mapper.service';
import { GetReleaseDto } from '../dto/get-release.dto';
import { Release } from '../entities/release.entity';

@Injectable()
export class ReleaseMapperService {
  constructor(@Inject(MixMapperService) private mixMapper: MixMapperService) {}

  releaseToGetReleaseDto(release: Release): GetReleaseDto {
    let dto: GetReleaseDto = new GetReleaseDto();

    dto.releaseId = release.releaseId;
    dto.releaseDate = release.releaseDate;
    dto.title = release.title;
    dto.likes = release.likes.length;
    if (release.mixes) {
      dto.mixes = this.mixMapper.mixesToGetMixDtos(release.mixes);
    }

    return dto;
  }

  releasesToGetReleaseDtos(releases: Release[]): GetReleaseDto[] {
    let dtos: GetReleaseDto[] = [];
    releases.forEach((release) => {
      dtos.push(this.releaseToGetReleaseDto(release));
    });

    return dtos;
  }
}
