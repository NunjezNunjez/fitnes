import { Entity, PrimaryGeneratedColumn, Column, OneToMany, ManyToMany } from 'typeorm';
import { Trening } from './trening.entity';

@Entity()
export class Vaja {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  naziv: string;

  @Column({ nullable: true })
  opis: string;

  @ManyToMany(() => Trening, (trening) => trening.vaja)
  treningi: Trening[];
}