import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Release } from './release.entity';

@Entity()
export class ReleaseLike {
  @PrimaryGeneratedColumn()
  releaseLikeId: number;

  @ManyToOne(() => Release, (Release) => Release.likes)
  @JoinColumn({ name: 'releaseId' })
  release: Release;

  @Column()
  subscriberId: number;
}
