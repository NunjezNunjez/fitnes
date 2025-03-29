import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { UporabnikModule } from '../uporabnik/uporabnik.module';
import { JwtAuthGuard } from './jwt-auth.guard';

@Module({
  imports: [
    JwtModule.register({
      secret: 'tajnikljuc',
      signOptions: { expiresIn: '1h' },
    }),
    UporabnikModule,
  ],
  providers: [AuthService, JwtAuthGuard], // Dodajte JwtAuthGuard med providers
  exports: [AuthService, JwtAuthGuard, JwtModule], // Dodajte JwtAuthGuard in JwtModule med exports
})
export class AuthModule {}