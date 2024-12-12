import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UseGuards,
  Request,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from '@prisma/client';
import { IsPublic } from 'src/auth/decorators/is-public.decorator';
import { JwtAuthGuard } from 'src/auth/guards/jwt-auth.guard';
import { FileInterceptor } from '@nestjs/platform-express/multer';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  getProfile(@Request() req: any) {
    return req.user;
  }

  @IsPublic()
  @Post()
  create(@Body() user: User): Promise<User> {
    return this.usersService.create(user);
  }

  @IsPublic()
  @Get()
  findAll(): Promise<User[]> {
    return this.usersService.findAll();
  }

  @IsPublic()
  @Get(':id')
  findOne(@Param('id') id: number): Promise<User | null> {
    return this.usersService.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UseInterceptors(FileInterceptor('image'))
  async update(
    @Param('id') id: number,
    @UploadedFile() image: Express.Multer.File,
    @Body() user: Partial<User>,
  ): Promise<User | null> {
    try {
      return await this.usersService.update(+id, user, image);
    } catch (error) {
      throw new BadRequestException(
        error.message || 'Erro ao atualizar usuário',
      );
    }
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.usersService.remove(+id);
  }
}
