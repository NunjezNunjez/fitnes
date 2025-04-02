import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany } from 'typeorm';
import { Uporabnik } from './uporabnik.entity';
import { Vaja } from './vaja.entity';
import { JoinTable } from 'typeorm';

@Entity()
export class Trening {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  datum: Date;

  @Column()
  trajanje: number;

  @Column({ nullable: true })
  opomba: string;

  @ManyToOne(() => Uporabnik, (uporabnik) => uporabnik.treningi)
  uporabnik: Uporabnik;

  @ManyToMany(() => Vaja, (vaja) => vaja.treningi)
  @JoinTable()
  vaja: Vaja[];
}