import { GetMixDto } from '../../mixes/dto/get-mix.dto';

export class GetReleaseDto {
  releaseId: number;
  title: string;
  releaseDate: Date;
  mixes?: GetMixDto[];
  likes: number;
}
