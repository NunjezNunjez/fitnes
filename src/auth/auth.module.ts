import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtAuthGuard } from './jwt-auth.guard';
import { JwtStrategy } from './jwt.strategy';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Uporabnik } from '../entitete/uporabnik.entity';

@Module({
  imports: [
    // Registracija TypeORM repozitorija za Uporabnik entiteto
    TypeOrmModule.forFeature([Uporabnik]),
    JwtModule.register({
      secret: 'vaš_zelo_varen_ključ_min_32_znakov',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [
    AuthService,
    JwtAuthGuard,
    JwtStrategy
  ],
  controllers: [AuthController],
  exports: [
    AuthService,
    JwtModule,
    JwtAuthGuard
  ],
})
export class AuthModule {}