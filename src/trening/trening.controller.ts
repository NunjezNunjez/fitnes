import { Controller, Post, Body, Get, UseGuards, Req, NotFoundException } from '@nestjs/common';
import { TreningService } from './trening.service';
import { UstvariTreningDto } from './dto/ustvari-trening.dto';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { Request } from 'express';
import { UporabnikService } from '../uporabnik/uporabnik.service';

@Controller('trening')
@UseGuards(JwtAuthGuard)
export class TreningController {
  constructor(
    private readonly treningService: TreningService,
    private readonly uporabnikService: UporabnikService
  ) {}

  @Post()
  async ustvariTrening(
    @Body() ustvariTreningDto: UstvariTreningDto,
    @Req() req: Request
  ) {
    if (!(req as any).user) {
      throw new NotFoundException('Uporabnik ni najden');
    }

    const uporabnik = await this.uporabnikService.najdiPoId((req as any).user.id);
    if (!uporabnik) {
      throw new NotFoundException('Uporabnik ne obstaja');
    }

    return this.treningService.ustvariTrening(uporabnik, ustvariTreningDto);
  }

  @Get()
  async vrniTreninge(@Req() req: Request) {
    if (!(req as any).user) {
      throw new NotFoundException('Uporabnik ni najden');
    }

    return this.treningService.vrniVseTreningeUporabnika((req as any).user.id);
  }
}