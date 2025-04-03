import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { UporabnikService } from './uporabnik.service';
import { AuthService } from '../auth/auth.service';
import { RegisterDto } from './dto/create-user.dto';
import { LoginDto } from './dto/update-user.dto';

@Controller('uporabnik')
export class UporabnikController {
  constructor(
    private readonly uporabnikService: UporabnikService,
    private readonly authService: AuthService,
  ) {}

  //  Registracija novega uporabnika
  @Post('register')
  async register(@Body() registerDto: RegisterDto, @Res() res) {
    try {
      const uporabnik = await this.uporabnikService.ustvariUporabnika( // Ustvari novega uporabnika preko servisa
        registerDto.email,
        registerDto.ime,
        registerDto.geslo,
      );

      return res.status(HttpStatus.CREATED).json({
        message: 'Uporabnik uspešno registriran',
        id: uporabnik.id,
      });
    } catch (error) {
      return res.status(HttpStatus.CONFLICT).json({ message: error.message });
    }
  }

  // Prijava obstoječega uporabnika
  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res) {
    const uporabnik = await this.uporabnikService.najdiPoEmailu(loginDto.email); // Najde uporabnika po emailu
    if (!uporabnik) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Napačen email ali geslo' });
    }

    // Preveri ujemanje gesla
    const jeGesloPravilno = await this.uporabnikService.preveriGeslo(uporabnik, loginDto.geslo);
    if (!jeGesloPravilno) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Napačen email ali geslo' });
    }
    const token = this.authService.ustvariToken(uporabnik);    // Ustvari JWT žeton za avtentikacijo
    return res.status(HttpStatus.OK).json({ token });
  }
}