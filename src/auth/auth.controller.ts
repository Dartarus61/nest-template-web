import { Body, Controller, Get, Headers, Post } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create_user.dto';
import { LoginDto } from './dto/login.dto';
import { newPassDto } from './dto/newPass.dto';
import { SwitchPassDto } from './dto/switchPass.dto';

@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiOperation({
    summary: 'Создание пользователя',
  })
  @Post('/signUp')
  reg(@Body() dto: CreateUserDto) {
    return this.authService.signUp(dto);
  }

  @ApiOperation({ summary: 'Авторизация в аккаунт' })
  @Post('/signin')
  login(@Body() dto: LoginDto) {
    return this.authService.login(dto);
  }
  @ApiOperation({ summary: 'Сброс пароля через ЛК' })
  @Post('/switchPassword')
  SwitchPass(@Body() dto: SwitchPassDto) {
    return this.authService.switchPass(dto);
  }

  @ApiOperation({ summary: 'Сброс пароля через почту' })
  @Post('/forgotPassword')
  ForgotPass(@Body('email') email: string) {
    return this.authService.forgotPass(email);
  }

  @ApiOperation({ summary: 'Установка нового пароля с кодом из почты' })
  @Post('/newPass')
  NewPass(@Body() dto: newPassDto) {
    return this.authService.newPass(dto);
  }

  @ApiOperation({ summary: 'Обновление токена' })
  @Get('/refresh')
  refresh(@Headers('Authorization') authorization) {
    return this.authService.refresh(authorization.split(' ')[1]);
  }
}
