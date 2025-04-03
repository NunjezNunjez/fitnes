import { Controller, Post, Body, Get, UseGuards, Req, NotFoundException, Delete, Param } from '@nestjs/common';
import { TreningService } from './trening.service';
import { UstvariTreningDto } from './dto/ustvari-trening.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { UporabnikService } from '../uporabnik/uporabnik.service';

@Controller('trening')
@UseGuards(JwtAuthGuard) // Zascita useh poti s JWT avtentikacijo
export class TreningController {
  constructor(
    private readonly treningService: TreningService,
    private readonly uporabnikService: UporabnikService,
  ) {}

  // Ustvari nov trening
  @Post()
  async ustvariTrening(
    @Body() ustvariTreningDto: UstvariTreningDto, // DTO za ustvarjanje treninga
    @Req() req: Request,
  ) {
    const user = (req as any).user; // Pridobi uporabnika iz requesta
    if (!user) {
      throw new NotFoundException('Uporabnik ni najden');
    }
    // Preveri obstoj uporabnika v bazi
    const uporabnik = await this.uporabnikService.najdiPoId(user.id);
    if (!uporabnik) {
      throw new NotFoundException('Uporabnik ne obstaja');
    }
    // Ustvari trening preko servisa
    return this.treningService.ustvariTrening(uporabnik, ustvariTreningDto);
  }

  // Pridobi vse treninge uporabnika
  @Get()
  async vrniTreninge(@Req() req: Request) {
    const user = (req as any).user;
    if (!user) {
      throw new NotFoundException('Uporabnik ni najden');
    }
    // Pridobi vse treninge uporabnika preko servisa
    return this.treningService.vrniVseTreningeUporabnika(user.id);
  }

  // Izbriši trening
  @Delete(':id')
  async izbrisiTrening(@Param('id') id: number, @Req() req: Request) {
    const user = (req as any).user;
    if (!user) {
      throw new NotFoundException('Uporabnik ni najden');
    }
    return this.treningService.izbrisiTrening(id, user.id);    // Izbrisi trening preko servisa
  }
}