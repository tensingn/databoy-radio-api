import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { MixLike } from '../../mixes/entities/mix-like.entity';
import { ReleaseLike } from '../../releases/entities/release-like.entity';

@Entity()
export class Subscriber {
  @PrimaryGeneratedColumn()
  subscriberId: number;

  @Column()
  email: string;

  @OneToMany(() => ReleaseLike, (releaseLike) => releaseLike.subscriber)
  releaseLikes: ReleaseLike[];

  @OneToMany(() => MixLike, (mixLike) => mixLike.subscriber)
  mixLikes: MixLike[];
}
