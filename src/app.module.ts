import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UporabnikModule } from './uporabnik/uporabnik.module';
import { TreningModule } from './trening/trening.module';
import { VajaModule } from './vaja/vaja.module';
import { AuthModule } from './auth/auth.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Trening } from './entitete/trening.entity';
import { Uporabnik } from './entitete/uporabnik.entity';
import { Vaja } from './entitete/vaja.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: 'postgres',
      database: 'fitnes2',
      entities: [Trening, Uporabnik, Vaja],
      synchronize: true,
      logging: true,
    }),
    AuthModule,
    UporabnikModule,
    TreningModule,
    VajaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
