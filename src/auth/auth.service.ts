import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcryptjs';
import { Prisma, Users } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService
  ) {}

  // Inscription (register)
  async register(registerDto: {
    username: string;
    email: string;
    password: string;
    profile_picture_uri?: string;
    bio?: string;
  }): Promise<Users> {
    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(registerDto.password, 10);
    const data: Prisma.UsersCreateInput = {
      username: registerDto.username,
      email: registerDto.email,
      password_hash: hashedPassword,
      profile_picture_uri: registerDto.profile_picture_uri,
      bio: registerDto.bio,
    };
    return this.usersService.create(data);
  }

  // Validation des identifiants lors du login
  async validateUser(email: string, password: string): Promise<Users> {
    const user = await this.usersService.findOneByEmail(email);
    if (!user) {
      throw new UnauthorizedException('Identifiants invalides');
    }
    const passwordValid = await bcrypt.compare(password, user.password_hash);
    if (!passwordValid) {
      throw new UnauthorizedException('Identifiants invalides');
    }
    return user;
  }

  // Login : génération du token JWT
  async login(loginDto: { email: string; password: string }): Promise<{ access_token: string, user_id: string }> {
    const user = await this.validateUser(loginDto.email, loginDto.password);
    const payload = { sub: user.id, username: user.username };
    const userId = user.id;
    return {
      access_token: this.jwtService.sign(payload),
      user_id: userId
    };
  }
}
