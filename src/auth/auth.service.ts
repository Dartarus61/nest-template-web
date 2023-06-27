import {
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/create_user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/login.dto';
import { SwitchPassDto } from './dto/switchPass.dto';
import { newPassDto } from './dto/newPass.dto';
import { PRIVATE_KEY } from 'src/core/constant';
import { PrismaService } from 'src/utils/prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
    private prisma: PrismaService,
  ) {}

  async signUp(userDto: CreateUserDto) {
    const candidate = await this.prisma.user.findUnique({
      where: {
        email: userDto.email,
      },
    });

    if (candidate) {
      throw new HttpException('User already registred', HttpStatus.BAD_REQUEST);
    }

    const hashPassword = await bcrypt.hash(userDto.password, 7);

    const user = await this.userService.createUser({
      ...userDto,
      password: hashPassword,
    });

    return this.generateToken(user);
  }

  private async generateToken(user) {
    const payload = {
      email: user.email,
      id: user.id,
    };
    return {
      token: this.jwtService.sign(payload, { secret: PRIVATE_KEY }),
      user: {
        id: user.id,
        email: user.email,
      },
    };
  }

  private async validateUser(userDto: LoginDto) {
    const user = await this.userService.getUserByEmail(userDto.email);
    if (!user) throw new HttpException('User not found', HttpStatus.NOT_FOUND);
    const isPasswordEquals = await bcrypt.compare(
      userDto.password,
      user.password,
    );
    if (user && isPasswordEquals) {
      return user;
    }
    throw new UnauthorizedException({
      message: 'Некорректный емайл или пароль',
    });
  }

  async login(userDto: LoginDto) {
    const user = await this.validateUser(userDto);
    return this.generateToken(user);
  }

  async switchPass(dto: SwitchPassDto) {
    const user = await this.userService.getUserById(dto.id);

    const isPassEquils = await bcrypt.compare(dto.password, user.password);

    if (!isPassEquils) {
      throw new HttpException('Неверный старый пароль', HttpStatus.BAD_REQUEST);
    }

    const isNewPassEquils = await bcrypt.compare(
      dto.newPassword,
      user.password,
    );

    if (isNewPassEquils) {
      throw new HttpException(
        'Новый пароль не может совпадать со старым',
        HttpStatus.BAD_REQUEST,
      );
    }

    const hashPassword = await bcrypt.hash(dto.newPassword, 7);
    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashPassword,
      },
    });

    const tokens = await this.generateToken(user);

    return {
      ...tokens,
    };
  }

  async forgotPass(email: string) {
    const user = await this.userService.getUserByEmail(email);
    if (!user)
      throw new HttpException('Пользователь не найден', HttpStatus.NOT_FOUND);
    const key = `f${(~~(Math.random() * 1e8)).toString(16)}`;

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        passwordSwitchKey: key,
      },
    });
    //await this.mailService.sendSwitchPasswordCodeMail(email, key);

    return;
  }

  async newPass(dto: newPassDto) {
    const user = await this.userService.getUserByCode(dto.code);
    if (!user) throw new HttpException('Неверный код', HttpStatus.NOT_FOUND);

    const hashPassword = await bcrypt.hash(dto.newPass, 7);

    await this.prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hashPassword,
        passwordSwitchKey: null,
      },
    });

    const tokens = await this.generateToken(user);

    return {
      ...tokens,
      user: user.email,
    };
  }

  async refresh(token: string) {
    const isValidToken = this.jwtService.verify(token, { secret: PRIVATE_KEY });

    if (isValidToken) {
      const user = await this.prisma.user.findFirst({
        where: {
          id: isValidToken.id,
        },
      });

      return this.generateToken(user);
    } else {
      throw new UnauthorizedException('Invalid token during verify');
    }
  }
}
