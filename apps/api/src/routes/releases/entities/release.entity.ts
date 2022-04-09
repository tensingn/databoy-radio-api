import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Mix } from '../../mixes/entities/mix.entity';
import { ReleaseLike } from './release-like.entity';

@Entity()
export class Release {
  @PrimaryGeneratedColumn()
  releaseId: number;

  @Column()
  title: string;

  @Column()
  releaseDate: Date;

  @OneToMany(() => Mix, (mix) => mix.release)
  mixes: Mix[];

  @OneToMany(() => ReleaseLike, (releaseLike) => releaseLike.release)
  likes: ReleaseLike[];

  @Column()
  numLikes: number;
}
