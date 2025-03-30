import { Controller, Post, Body, Res, HttpStatus } from '@nestjs/common';
import { UporabnikService } from './uporabnik.service';
import { AuthService } from '../auth/auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('uporabnik')
export class UporabnikController {
  constructor(
    private readonly uporabnikService: UporabnikService,
    private readonly authService: AuthService,
  ) {
  }

  @Post('register')
  async register(@Body() registerDto: RegisterDto, @Res() res) {
    try {
      const uporabnik = await this.uporabnikService.ustvariUporabnika(
        registerDto.email,
        registerDto.ime,
        registerDto.geslo,
      );

      // Vrnemo samo potrditev, brez tokena
      return res.status(HttpStatus.CREATED).json({
        message: 'Uporabnik uspešno registriran',
        id: uporabnik.id
      });
    } catch (error) {
      return res.status(HttpStatus.CONFLICT).json({ message: error.message });
    }
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto, @Res() res) {
    const uporabnik = await this.uporabnikService.najdiPoEmailu(loginDto.email);

    if (!uporabnik) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Napačen email ali geslo' });
    }

    const jeGesloPravilno = await this.uporabnikService.preveriGeslo(uporabnik, loginDto.geslo);

    if (!jeGesloPravilno) {
      return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Napačen email ali geslo' });
    }

    // Tukaj se zdaj ujema ime metode
    const token = this.authService.ustvariToken(uporabnik);
    return res.status(HttpStatus.OK).json({ token });
  }
}
