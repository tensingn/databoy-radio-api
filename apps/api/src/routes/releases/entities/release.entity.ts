import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Mix } from '../../mixes/entities/mix.entity';

@Entity()
export class Release {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  releaseDate: Date;

  @OneToMany(() => Mix, (mix) => mix.release)
  mixes: Mix[];
}
