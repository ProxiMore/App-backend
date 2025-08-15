import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // extrait le token depuis le header Authorization (sous la forme Bearer <token>)
      ignoreExpiration: false, // rejette les tokens expirés
      secretOrKey: process.env.JWT_SECRET || 'SECRET_KEY',
    });
  }

  // Appelée après la vérification du token
  async validate(payload: any) {
    // Le résultat sera disponible dans req.user dans les contrôleurs protégés
    // Le payload contient le sub et le username
    return { userId: payload.sub, username: payload.username };
  }
}
