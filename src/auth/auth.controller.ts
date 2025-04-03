import { Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegisterDto } from './user-register.dto';
import { UserLoginDto } from './user-login.dto';

// Glavni controller za avtentikacijo (registracija in prijava)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // registracija novega uporabnika
  @Post('register')
  async register(@Body() userRegisterDto: UserRegisterDto) {
    try {
      const user = await this.authService.register(userRegisterDto);
      return { message: 'Uporabnik uspešno registriran', userId: user.id };
    } catch (error) {
      // Ce email ze obstaja ali drug problem
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  // prijava obstojecega uporabnika
  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto) {
    // Poklicemo  metodo za prijavo (preveri geslo in ustvari JWT)
    const token = await this.authService.login(userLoginDto);

    // Preveri ce je login uspesen
    if (!token) {
      throw new HttpException('Napačen email ali geslo', HttpStatus.UNAUTHORIZED);
    }

    // Vrne JWT za zasciten dostop
    return { token };
  }
}