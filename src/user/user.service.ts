import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/auth/dto/create_user.dto';
import { PrismaService } from 'src/utils/prisma/prisma.service';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async createUser(dto: CreateUserDto) {
    const user = await this.prisma.user.create({
      data: { ...dto },
    });

    return user;
  }

  async getAll() {
    return this.prisma.user.findMany();
  }

  async getUserById(id: string) {
    return this.prisma.user.findFirst({
      where: {
        id,
      },
    });
  }

  async getUserByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: {
        email,
      },
    });
  }

  async getUserByCode(passwordSwitchKey: string) {
    return this.prisma.user.findFirst({
      where: {
        passwordSwitchKey,
      },
    });
  }
}
