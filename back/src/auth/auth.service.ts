import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { UserPayload } from './models/UserPayload';
import { UserToken } from './models/UserToken';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaClient,
    private readonly jwtService: JwtService,
  ) {}

  async login(userDto: {
    email: string;
    password: string;
  }): Promise<UserToken> {
    const validatedUser = await this.validateUser(
      userDto.email,
      userDto.password,
    );

    if (validatedUser) {
      const payload: UserPayload = {
        sub: validatedUser.id,
        email: validatedUser.email,
      };

      const jwtToken = this.jwtService.sign(payload);

      return {
        access_token: jwtToken,
        user_email: validatedUser.email,
      };
    } else {
      throw new UnauthorizedException('Email ou senha incorretos.');
    }
  }

  async validateUser(email: string, password: string) {
    const users = await this.prisma.user.findFirst({
      where: { email },
    });

    if (users) {
      const isPasswordValid = await bcrypt.compare(password, users.password);

      if (isPasswordValid) {
        return {
          ...users,
          password: password,
        };
      }
    }
    throw new UnauthorizedException(
      'Email ou senha enviados estão incorretos.',
    );
  }
}
