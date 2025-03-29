import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Uporabnik } from './uporabnik.entity';
import { Vaja } from './vaja.entity';

@Entity()
export class Trening {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  datum: Date;

  @Column()
  trajanje: number; // V minutah

  @Column({ nullable: true })
  opomba: string;

  @ManyToOne(() => Uporabnik, (uporabnik) => uporabnik.treningi)
  uporabnik: Uporabnik;

  @ManyToOne(() => Vaja, (vaja) => vaja.treningi)
  vaja: Vaja;
}