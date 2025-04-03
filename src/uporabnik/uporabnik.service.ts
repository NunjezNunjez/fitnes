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

  async najdiPoEmailu(email: string): Promise<Uporabnik | null> { // Najde uporabnika po mejlu
    return this.uporabnikRepository.findOne({ where: { email } });
  }

  async ustvariUporabnika(email: string, ime: string, geslo: string): Promise<Uporabnik> {
    const obstojecUporabnik = await this.uporabnikRepository.findOne({ where: { email } });
    if (obstojecUporabnik) {
      throw new ConflictException('Uporabnik s tem emailom ze obstaja');
    }

    const sol = await bcrypt.genSalt();  // Generira sol in zashiraj geslo
    const hashGeslo = await bcrypt.hash(geslo, sol);

    const novUporabnik = this.uporabnikRepository.create({   // Ustvari novega uporabnika
      email,
      ime,
      geslo: hashGeslo, // Shrani zashirano geslo
    });


    return this.uporabnikRepository.save(novUporabnik);   // Shrani uporabnika v bazo
  }

  async preveriGeslo(uporabnik: Uporabnik, geslo: string): Promise<boolean> {   // Preveri ujemanje vnešenega gesla z zashiranim geslom
    return bcrypt.compare(geslo, uporabnik.geslo);
  }

  // Najde uporabnika po IDju z njegovimi treningi
  async najdiPoId(id: number): Promise<Uporabnik | null> {
    return this.uporabnikRepository.findOne({
      where: { id },
      relations: ['treningi'], // Vkljuci povezane treninge
    });
  }
}