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
      secret: 'tajniKljuc', // V produkciji uporabite pravi skriti ključ!
      signOptions: { expiresIn: '1h' },
    }),
  ],
  providers: [UporabnikService, AuthService],
  controllers: [UporabnikController],
  exports: [UporabnikService],
})
export class UporabnikModule {}