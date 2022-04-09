import { Release } from '../../releases/entities/release.entity';

export class GetMixDto {
  mixId: number;
  title: string;
  likes: number;
  src: string;
  release: Release;
}
