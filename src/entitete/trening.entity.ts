import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Uporabnik } from './uporabnik.entity';
import { Vaja } from './vaja.entity';

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

  @ManyToOne(() => Vaja, (vaja) => vaja.treningi)
  vaja: Vaja;
}
