import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { MixLike } from './mix-like.entity';
import { Release } from '../../releases/entities/release.entity';

@Entity()
export class Mix {
  @PrimaryGeneratedColumn()
  mixId: number;

  @Column()
  title: string;

  @OneToMany(() => MixLike, (mixLike) => mixLike.mix)
  likes: MixLike[];

  @Column()
  src: string;

  @ManyToOne(() => Release, (release) => release.mixes)
  release: Release;
}
