import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Vaja } from '../entitete/vaja.entity';

@Injectable()
export class VajaService {
  constructor(
    @InjectRepository(Vaja)
    private vajaRepository: Repository<Vaja>,
  ) {}

  async ustvariVajo(naziv: string, opis?: string): Promise<Vaja> {
    const vaja = this.vajaRepository.create({ naziv, opis });
    return this.vajaRepository.save(vaja);
  }

  async vrniVseVaje(): Promise<Vaja[]> {
    return this.vajaRepository.find();
  }

  async posodobiVajo(id: number, updateData: Partial<Vaja>): Promise<Vaja> {
    const vaja = await this.vajaRepository.findOne({ where: { id } });
    if (!vaja) {
      throw new NotFoundException('Vaja ne obstaja');
    }
    const posodobljenaVaja = this.vajaRepository.merge(vaja, updateData);
    return this.vajaRepository.save(posodobljenaVaja);
  }

  async vrniVajo(id: number): Promise<Vaja> {
    const vaja = await this.vajaRepository.findOne({ where: { id } });
    if (!vaja) {
      throw new NotFoundException('Vaja ne obstaja');
    }
    return vaja;
  }

  async izbrisiVajo(id: number): Promise<boolean> {
    const vaja = await this.vajaRepository.findOne({ where: { id } });
    if (!vaja) {
      throw new NotFoundException('Vaja ne obstaja');
    }
    await this.vajaRepository.remove(vaja);
    return true;
  }

}