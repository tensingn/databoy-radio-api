import { Like } from 'apps/api/src/services/likes/entities/like.entity';

export class ReleaseLike extends Like {
  releaseTitle: string;

  constructor() {
    super(ReleaseLike.name.toLocaleLowerCase());
    this.releaseTitle = '';
  }
}
