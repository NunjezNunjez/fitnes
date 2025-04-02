import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Trening } from './trening.entity';

@Entity()
export class Uporabnik {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  email: string;

  @Column()
  ime: string;

  @Column()
  geslo: string;

  @OneToMany(() => Trening, (trening) => trening.uporabnik)
  treningi: Trening[];
}