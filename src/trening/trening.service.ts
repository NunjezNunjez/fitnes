// src/trening/trening.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Trening } from '../entitete/trening.entity';
import { Uporabnik } from '../entitete/uporabnik.entity';
import { Vaja } from '../entitete/vaja.entity';
import { UstvariTreningDto } from './dto/ustvari-trening.dto';

@Injectable()
export class TreningService {
  constructor(
    @InjectRepository(Trening)
    private treningRepository: Repository<Trening>,
    @InjectRepository(Vaja)
    private vajaRepository: Repository<Vaja>,
  ) {}

  async ustvariTrening(
    uporabnik: Uporabnik,
    ustvariTreningDto: UstvariTreningDto,
  ): Promise<Trening> {
    const vaja = await this.vajaRepository.findOne({
      where: { id: ustvariTreningDto.vajaId },
    });
    if (!vaja) {
      throw new NotFoundException('Vaja ne obstaja');
    }
    const trening = this.treningRepository.create({
      datum: ustvariTreningDto.datum,
      trajanje: ustvariTreningDto.trajanje,
      opomba: ustvariTreningDto.opomba,
      uporabnik,
      vaja,
    });
    return this.treningRepository.save(trening);
  }

  async vrniVseTreningeUporabnika(uporabnikId: number): Promise<Trening[]> {
    return this.treningRepository.find({
      where: { uporabnik: { id: uporabnikId } },
      relations: ['vaja', 'uporabnik'],
    });
  }
}
