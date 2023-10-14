import { MixLike } from './mix-like.entity';
import { Release } from '../../releases/entities/release.entity';

export class Mix {
  mixId: number;

  title: string;

  likes: MixLike[];

  src: string;

  release: Release;
}
