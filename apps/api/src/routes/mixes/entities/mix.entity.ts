import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Release } from '../../releases/entities/release.entity';

@Entity()
export class Mix {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  likes: number;

  // might implement this later depending on business needs
  // release: Release;

  @Column()
  src: string;

  @ManyToOne(() => Release, (release) => release.mixes)
  release: Release;
}
