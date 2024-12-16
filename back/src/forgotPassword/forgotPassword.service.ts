import { Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { google } from 'googleapis';
import * as nodemailer from 'nodemailer';
import { v4 as uuidv4 } from 'uuid';
import * as bcrypt from 'bcrypt';

@Injectable()
export class ForgotPasswordService {
  private oAuth2Client;

  constructor(private prisma: PrismaClient) {
    this.oAuth2Client = new google.auth.OAuth2(
      process.env.GOOGLE_CLIENT_ID,
      process.env.GOOGLE_CLIENT_SECRET,
      process.env.GOOGLE_REDIRECT_URI,
    );
    this.oAuth2Client.setCredentials({
      refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
    });
  }

  async sendResetCode(email: string): Promise<string> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('User not found');
    }

    const resetCode = uuidv4().slice(0, 6);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { resetCode },
    });

    const accessToken = await this.oAuth2Client.getAccessToken();

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: process.env.EMAIL_USER,
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        refreshToken: process.env.GOOGLE_REFRESH_TOKEN,
        accessToken: accessToken.token,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: 'Recuperação de Senha',
      text: `Seu código de recuperação de senha é: ${resetCode}`,
    };

    await transporter.sendMail(mailOptions);

    return 'Código de redefinição enviado com sucesso!';
  }

  async resetPassword(
    email: string,
    code: string,
    newPassword: string,
  ): Promise<string> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error('User not found');
    }

    if (user.resetCode !== code) {
      throw new Error('Invalid reset code');
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    await this.prisma.user.update({
      where: { id: user.id },
      data: { password: hashedPassword, resetCode: null },
    });

    return 'Senha redefinida com sucesso!';
  }
}
