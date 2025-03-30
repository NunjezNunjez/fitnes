import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vaja } from '../entitete/vaja.entity';
import { VajaService } from './vaja.service';
import { VajaController } from './vaja.controller';
import { AuthModule } from '../auth/auth.module'; // Dodajte ta import

@Module({
  imports: [
    TypeOrmModule.forFeature([Vaja]),
    AuthModule, // Dodajte AuthModule tukaj
  ],
  providers: [VajaService],
  controllers: [VajaController],
})
export class VajaModule {}