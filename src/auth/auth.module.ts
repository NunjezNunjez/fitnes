import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UporabnikModule } from '../uporabnik/uporabnik.module';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    JwtModule.register({
      secret: 'vaš_zelo_varen_ključ_min_32_znakov',
      signOptions: { expiresIn: '24h' },
    }),
    UporabnikModule,
  ],
  providers: [
    AuthService,
    JwtAuthGuard, // Dodajte guard kot provider
    JwtStrategy,
  ],
  exports: [
    AuthService,
    JwtModule, // Exportajte JwtModule
    JwtAuthGuard, // Exportajte guard
  ],
})
export class AuthModule {}