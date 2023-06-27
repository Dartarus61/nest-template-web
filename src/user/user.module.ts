import { Module } from '@nestjs/common';
import { PrismaService } from 'src/utils/prisma/prisma.service';
import { UserService } from './user.service';

@Module({
  providers: [UserService, PrismaService],
  exports: [UserService],
  imports: [],
})
export class UserModule {}
