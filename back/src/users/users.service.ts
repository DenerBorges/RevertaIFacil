import { Injectable } from '@nestjs/common';
import { PrismaClient, User } from '@prisma/client';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaClient) {}

  async create(data: any): Promise<User> {
    const existingEmail = await this.prisma.user.findUnique({
      where: { email: data.email },
    });

    if (existingEmail) {
      throw new Error('Email already exists.');
    }

    const hashedPassword = await bcrypt.hash(data.password, 10);
    const users = await this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
    return users;
  }

  async findAll(): Promise<User[]> {
    const foundAllUser = await this.prisma.user.findMany({});
    return foundAllUser;
  }

  async findOne(id: number): Promise<User> {
    const foundOneUser = await this.prisma.user.findUnique({
      where: { id },
    });
    return foundOneUser;
  }

  async findByUser(email: string): Promise<User> {
    const foundUser = await this.prisma.user.findFirst({
      where: { email },
    });
    return foundUser;
  }

  async update(
    id: number,
    data: Partial<User>,
    image?: Express.Multer.File,
  ): Promise<User> {
    const existingUser = await this.prisma.user.findUnique({ where: { id } });
    if (!existingUser) {
      throw new Error('Usuário não encontrado.');
    }

    if (image) {
      const imageStrings = image.buffer.toString('base64');
      data.profilePic = imageStrings;
    }
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data,
    });
    return updatedUser;
  }

  async remove(id: number) {
    const deletedUser = await this.prisma.user.delete({
      where: { id },
    });
    return deletedUser;
  }
}
