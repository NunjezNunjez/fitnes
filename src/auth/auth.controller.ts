import { Body, Controller, Post, HttpException, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserRegisterDto } from './user-register.dto';
import { UserLoginDto } from './user-login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async register(@Body() userRegisterDto: UserRegisterDto) {
    try {
      const user = await this.authService.register(userRegisterDto);
      return { message: 'Uporabnik uspešno registriran', userId: user.id };
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.CONFLICT);
    }
  }

  @Post('login')
  async login(@Body() userLoginDto: UserLoginDto) {
    const token = await this.authService.login(userLoginDto);
    if (!token) {
      throw new HttpException('Napačen email ali geslo', HttpStatus.UNAUTHORIZED);
    }
    return { token };
  }
}
