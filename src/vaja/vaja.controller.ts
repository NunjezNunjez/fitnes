import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { VajaService } from './vaja.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

@Controller('vaja')
@UseGuards(JwtAuthGuard) // Zaščitite vse poti
export class VajaController {
  constructor(private readonly vajaService: VajaService) {}

  @Post()
  async ustvariVajo(@Body() novaVaja: any) {
    return this.vajaService.ustvariVajo(novaVaja);
  }

  @Get()
  async vrniVseVaje() {
    return this.vajaService.vrniVseVaje();
  }
}