import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

import { Uporabnik } from '../entitete/uporabnik.entity';
import { UserRegisterDto } from './user-register.dto';
import { UserLoginDto } from './user-login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Uporabnik)
    private uporabnikRepository: Repository<Uporabnik>,
  ) {}

  async register(userData: UserRegisterDto): Promise<Uporabnik> {
    const hash = await bcrypt.hash(userData.geslo, 10);
    const novUporabnik = this.uporabnikRepository.create({
      email: userData.email,
      geslo: hash,
    });
    return this.uporabnikRepository.save(novUporabnik);
  }

  async login(userData: UserLoginDto): Promise<string | null> {
    const uporabnik = await this.uporabnikRepository.findOne({
      where: { email: userData.email },
    });
    if (!uporabnik) return null;

    const jeGesloPravilno = await bcrypt.compare(userData.geslo, uporabnik.geslo);
    if (!jeGesloPravilno) return null;

    return this.jwtService.sign({ id: uporabnik.id });
  }
}