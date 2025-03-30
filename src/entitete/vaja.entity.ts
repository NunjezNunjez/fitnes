import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Trening } from './trening.entity';

@Entity()
export class Vaja {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  naziv: string;

  @Column({ nullable: true })
  opis: string;

  @OneToMany(() => Trening, (trening) => trening.vaja)
  treningi: Trening[];
}
