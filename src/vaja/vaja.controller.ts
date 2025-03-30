import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { VajaService } from './vaja.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UstvariVajoDto } from './dto/ustvari-vajo.dto';

@Controller('vaja')
@UseGuards(JwtAuthGuard)
export class VajaController {
  constructor(private readonly vajaService: VajaService) {}

  @Post()
  async ustvariVajo(@Body() ustvariVajoDto: UstvariVajoDto) {
    return this.vajaService.ustvariVajo(ustvariVajoDto.naziv, ustvariVajoDto.opis);
  }

  @Get()
  async vrniVseVaje() {
    return this.vajaService.vrniVseVaje();
  }
}
