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
    const obstojecUporabnik = await this.uporabnikRepository.findOne({ where: { email } });
    if (obstojecUporabnik) {
      throw new ConflictException('Uporabnik s tem emailom že obstaja');
    }

    const sol = await bcrypt.genSalt();
    const hashGeslo = await bcrypt.hash(geslo, sol);

    const novUporabnik = this.uporabnikRepository.create({
      email,
      ime,
      geslo: hashGeslo,
    });
    return this.uporabnikRepository.save(novUporabnik);
  }

  async preveriGeslo(uporabnik: Uporabnik, geslo: string): Promise<boolean> {
    return bcrypt.compare(geslo, uporabnik.geslo);
  }

  async najdiPoId(id: number): Promise<Uporabnik | null> {
    return this.uporabnikRepository.findOne({
      where: { id },
      relations: ['treningi'],
    });
  }
}
