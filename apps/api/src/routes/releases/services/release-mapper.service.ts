import { Injectable } from '@nestjs/common';
import { GetReleaseDto } from '../dto/get-release.dto';
import { Release } from '../entities/release.entity';

@Injectable()
export class ReleaseMapperService {
  releaseToGetReleaseDto(release: Release): GetReleaseDto {
    let dto: GetReleaseDto = new GetReleaseDto();

    dto.releaseId = release.releaseId;
    dto.mixes = release.mixes;
    dto.releaseDate = release.releaseDate;
    dto.title = release.title;
    dto.likes = release.likes.length;

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
