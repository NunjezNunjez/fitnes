import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Uporabnik } from '../entitete/uporabnik.entity';
import { UserRegisterDto } from './user-register.dto';
import { UserLoginDto } from './user-login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    @InjectRepository(Uporabnik)
    private uporabnikRepository: Repository<Uporabnik>,
  ) {}

  // Registracija novega uporabnika
  async register(userData: UserRegisterDto): Promise<Uporabnik> {
    // Preveri ce uporabnik s tem emailom ze obstaja
    const existingUser = await this.uporabnikRepository.findOne({
      where: { email: userData.email }
    });
    if (existingUser) {
      throw new Error('Uporabnik s tem emailom ze obstaja');
    }

    // Zasifrira geslo pred shranjevanjem
    const hash = await bcrypt.hash(userData.geslo, 10);

    // Ustvari nov uporabniski zapis
    const newUser = this.uporabnikRepository.create({
      email: userData.email,
      ime: userData.email, // Privzeto nastavi email kot ime
      geslo: hash,        // Shrani zasifrirano geslo
    });
    return this.uporabnikRepository.save(newUser);
  }

  // Prijava uporabnika
  async login(userData: UserLoginDto): Promise<string | null> {
    const user = await this.uporabnikRepository.findOne({   // Poišce uporabnika po emailu
      where: { email: userData.email }
    });

    // Ce uporabnik ne obstaja
    if (!user) return null;
    const isPasswordValid = await bcrypt.compare(userData.geslo, user.geslo); // Preveri ujemanje gesla
    // Ce geslo ni pravilno
    if (!isPasswordValid) return null;
    return this.ustvariToken(user);   // Ustvari in vrne JWT zeton
  }

  // Generira JWT zeton za uporabnika
  ustvariToken(user: Uporabnik): string {
    // Podatki v zetonu
    const payload = {
      sub: user.id,
      email: user.email,
      role: 'user',
    };
    return this.jwtService.sign(payload);   // Podpise in vrne zeton
  }
}