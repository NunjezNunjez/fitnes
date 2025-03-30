// src/vaja/vaja.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vaja } from '../entitete/vaja.entity';
import { VajaService } from './vaja.service';
import { VajaController } from './vaja.controller';
import { AuthModule } from '../auth/auth.module'; // Ključno: uvoz AuthModule

@Module({
  imports: [
    TypeOrmModule.forFeature([Vaja]),
    AuthModule, // <-- Dodaj to, da bo JwtService in JwtAuthGuard na voljo
  ],
  providers: [VajaService],
  controllers: [VajaController],
})
export class VajaModule {}
