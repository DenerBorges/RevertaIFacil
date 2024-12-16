import { Module } from '@nestjs/common';
import { ForgotPasswordService } from './forgotPassword.service';
import { ForgotPasswordController } from './forgotPassword.controller';
import { PrismaModule } from 'src/prisma.module';

@Module({
  imports: [PrismaModule],
  controllers: [ForgotPasswordController],
  providers: [ForgotPasswordService],
  exports: [ForgotPasswordService],
})
export class ForgotPasswordModule {}
