import { Injectable, ConflictException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Uporabnik } from '../entitete/uporabnik.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UporabnikService {
  constructor(
    @InjectRepository(Uporabnik)
    private uporabnikRepository: Repository<Uporabnik>,
  ) {}

  async najdiPoEmailu(email: string): Promise<Uporabnik | null> {
    return this.uporabnikRepository.findOne({ where: { email } });
  }

  async ustvariUporabnika(email: string, ime: string, geslo: string): Promise<Uporabnik> {
    console.log('Začetek ustvarjanja uporabnika'); // Debug log

    const obstojecUporabnik = await this.uporabnikRepository.findOne({ where: { email } });
    if (obstojecUporabnik) {
      console.log('Uporabnik že obstaja'); // Debug log
      throw new ConflictException('Uporabnik s tem emailom že obstaja');
    }

    const sol = await bcrypt.genSalt();
    const hashGeslo = await bcrypt.hash(geslo, sol);

    console.log('Ustvarjam novega uporabnika'); // Debug log
    const novUporabnik = this.uporabnikRepository.create({
      email,
      ime,
      geslo: hashGeslo,
    });

    console.log('Shranjujem v bazo:', novUporabnik); // Debug log
    try {
      const shranjenUporabnik = await this.uporabnikRepository.save(novUporabnik);
      console.log('Uspešno shranjeno:', shranjenUporabnik); // Debug log
      return shranjenUporabnik;
    } catch (error) {
      console.error('Napaka pri shranjevanju:', error); // Debug log
      throw new Error('Napaka pri shranjevanju uporabnika');
    }
  }

  async preveriGeslo(uporabnik: Uporabnik, geslo: string): Promise<boolean> {
    return bcrypt.compare(geslo, uporabnik.geslo);
  }
  async najdiPoId(id: number): Promise<Uporabnik | null> {
    return this.uporabnikRepository.findOne({
      where: { id },
      relations: ['treningi']
    });
  }
}