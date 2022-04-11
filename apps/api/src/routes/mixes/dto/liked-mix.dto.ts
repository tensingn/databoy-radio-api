import { GetMixDto } from '../dto/get-mix.dto';

export class LikedMixDto extends GetMixDto {
  isLiked: boolean;
}
