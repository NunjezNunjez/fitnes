import { Injectable } from '@nestjs/common';
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
}