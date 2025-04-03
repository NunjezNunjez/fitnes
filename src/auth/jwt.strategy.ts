import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Doloca kje in kako najti JWT zeton v zahtevi
      ignoreExpiration: false,
      secretOrKey: 'vaš_zelo_varen_ključ_min_32_znakov',
    });
  }

  // za validacijo dekodiranega payloada
  async validate(payload: any) {
    return {
      id: payload.sub,
      email: payload.email,
      role: payload.role || 'user',
    };
  }
}