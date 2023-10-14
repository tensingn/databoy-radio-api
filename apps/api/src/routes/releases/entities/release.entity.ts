import { Mix } from '../../mixes/entities/mix.entity';
import { ReleaseLike } from './release-like.entity';

export class Release {
  releaseId: number;

  title: string;

  releaseDate: Date;

  mixes: Mix[];

  likes: ReleaseLike[];
}
