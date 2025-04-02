import { Controller, Get, Post, Body, UseGuards, Delete, Param, NotFoundException, Put } from '@nestjs/common';
import { VajaService } from './vaja.service';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UstvariVajoDto } from './dto/ustvari-vajo.dto';
import { Vaja } from '../entitete/vaja.entity';

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

  @Put(':id')
  async posodobiVajo(@Param('id') id: number, @Body() updateData: Partial<Vaja>) {
    const posodobljena = await this.vajaService.posodobiVajo(id, updateData);
    if (!posodobljena) {
      throw new NotFoundException('Vaja ne obstaja');
    }
    return posodobljena;
  }

  @Get(':id')
  async vrniVajo(@Param('id') id: number) {
    const vaja = await this.vajaService.vrniVajo(id);
    if (!vaja) {
      throw new NotFoundException('Vaja ne obstaja');
    }
    return vaja;
  }

  @Delete(':id')
  async izbrisiVajo(@Param('id') id: number) {
    const izbrisana = await this.vajaService.izbrisiVajo(id);
    if (!izbrisana) {
      throw new NotFoundException('Vaja ne obstaja');
    }
    return { message: 'Vaja uspešno izbrisana' };
  }

}