import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
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
    const vaje = await this.vajaRepository.find({ // Poisce vaje ki ustrezajo ID-jem iz DTO
      where: { id: In(ustvariTreningDto.vajaIDs) },
    });

    if (!vaje || vaje.length === 0) {
      throw new NotFoundException('Nobena vaja ni bila najdena');
    }
    const datum = new Date(ustvariTreningDto.datum); //ce pride datum kot strin , se pretvori v date

    const trening = this.treningRepository.create({
      datum,
      trajanje: ustvariTreningDto.trajanje,
      opomba: ustvariTreningDto.opomba,
      uporabnik,
      vaja: vaje,
    });

    return this.treningRepository.save(trening);
  }
  async izbrisiTrening(treningId: number, uporabnikId: number): Promise<void> {
    // preveri ali trening pripada uporabniku se prepreci brisanje tujih treningov
    const trening = await this.treningRepository.findOne({
      where: { id: treningId, uporabnik: { id: uporabnikId } },
    });
    if (!trening) {
      throw new NotFoundException('Trening ne obstaja ali ni dostopen');
    }
    await this.treningRepository.remove(trening);
  }

  async vrniVseTreningeUporabnika(uporabnikId: number): Promise<Trening[]> {
    return this.treningRepository.find({
      where: { uporabnik: { id: uporabnikId } },
      relations: ['vaja', 'uporabnik'],
    });
  }
}