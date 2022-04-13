import { LikedMixDto } from '../../mixes/dto/liked-mix.dto';
import { GetReleaseDto } from '../dto/get-release.dto';

export class LikedReleaseDto extends GetReleaseDto {
  isLiked: boolean;
}
