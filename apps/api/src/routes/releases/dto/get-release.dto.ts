import { Mix } from '../../mixes/entities/mix.entity';

export class GetReleaseDto {
  releaseId: number;
  title: string;
  releaseDate: Date;
  mixes: Mix[];
  likes: number;
}
