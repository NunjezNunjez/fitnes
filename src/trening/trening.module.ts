// src/trening/trening.module.ts
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Trening } from '../entitete/trening.entity';
import { Vaja } from '../entitete/vaja.entity';
import { TreningService } from './trening.service';
import { TreningController } from './trening.controller';
import { VajaModule } from '../vaja/vaja.module';
import { AuthModule } from '../auth/auth.module';
import { UporabnikModule } from '../uporabnik/uporabnik.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Trening, Vaja]),
    VajaModule,
    AuthModule,
    UporabnikModule,
  ],
  providers: [TreningService],
  controllers: [TreningController],
})
export class TreningModule {}
