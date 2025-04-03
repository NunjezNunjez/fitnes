import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Uporabnik } from '../entitete/uporabnik.entity';
import { UporabnikService } from './uporabnik.service';
import { UporabnikController } from './uporabnik.controller';
import { AuthService } from '../auth/auth.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Uporabnik]),
    JwtModule.register({
      secret: 'vaš_zelo_varen_ključ_min_32_znakov',
      signOptions: { expiresIn: '24h' },
    }),
  ],
  providers: [UporabnikService, AuthService],
  controllers: [UporabnikController],
  exports: [UporabnikService],
})
export class UporabnikModule {}
