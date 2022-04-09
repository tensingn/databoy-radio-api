import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Mix } from './mix.entity';

@Entity()
export class MixLike {
  @PrimaryGeneratedColumn()
  mixLikeId: number;

  @ManyToOne(() => Mix, (mix) => mix.likes)
  @JoinColumn({ name: 'mixId' })
  mix: Mix;

  @Column()
  subscriberId: number;
}
