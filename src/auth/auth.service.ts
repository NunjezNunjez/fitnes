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

  async register(userData: UserRegisterDto): Promise<Uporabnik> {
    const existingUser = await this.uporabnikRepository.findOne({ where: { email: userData.email } });
    if (existingUser) {
      throw new Error('Uporabnik s tem emailom že obstaja');
    }
    const hash = await bcrypt.hash(userData.geslo, 10);
    const newUser = this.uporabnikRepository.create({
      email: userData.email,
      ime: userData.email, // ali uporabniško ime, če je na voljo
      geslo: hash,
    });
    return this.uporabnikRepository.save(newUser);
  }

  async login(userData: UserLoginDto): Promise<string | null> {
    const user = await this.uporabnikRepository.findOne({ where: { email: userData.email } });
    if (!user) return null;
    const isPasswordValid = await bcrypt.compare(userData.geslo, user.geslo);
    if (!isPasswordValid) return null;
    return this.ustvariToken(user);
  }

  ustvariToken(user: Uporabnik): string {
    const payload = {
      sub: user.id,
      email: user.email,
      role: 'user',
    };
    return this.jwtService.sign(payload);
  }
}