import { Uporabnik } from '../entitete/uporabnik.entity';

declare global {
  namespace Express {
    interface Request {
      user: {
        id: number;
        email: string;
      };
    }
  }
}