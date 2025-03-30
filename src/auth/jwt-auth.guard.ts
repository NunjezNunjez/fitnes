import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class JwtAuthGuard implements CanActivate {
  private readonly logger = new Logger(JwtAuthGuard.name);

  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);

    this.logger.debug(`Preverjam token: ${token}`);

    if (!token) {
      this.logger.warn('Zahteva brez tokena');
      throw new UnauthorizedException('Ni avtorizacijskega tokena');
    }

    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: 'vaš_zelo_varen_ključ_min_32_znakov',
      });
      this.logger.debug(`Token payload: ${JSON.stringify(payload)}`);

      (request as any).user = payload;
      return true;
    } catch (error) {
      this.logger.error(`Napaka pri verifikaciji: ${error.message}`);
      throw new UnauthorizedException('Neveljaven ali potekel token');
    }
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const authHeader = request.headers.authorization;
    if (!authHeader) return undefined;

    const [type, token] = authHeader.split(' ');
    if (!type || type.toLowerCase() !== 'bearer') {
      this.logger.warn(`Napačna avtorizacijska shema: ${type}`);
      return undefined;
    }
    return token;
  }
}
