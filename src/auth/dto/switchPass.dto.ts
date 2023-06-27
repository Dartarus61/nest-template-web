import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNumber, IsString, Length } from 'class-validator';

export class SwitchPassDto {
  @IsString({ message: 'Должно быть строкой' })
  readonly id: string;

  @ApiProperty({ example: '12345', description: 'пароль' })
  @Length(6, 32, { message: 'пароль от 6 до 32 символов' })
  @IsString({ message: 'Должно быть строкой' })
  readonly newPassword: string;

  @IsString({ message: 'Должно быть строкой' })
  @Length(6, 32, { message: 'Не меньше 6 и не больше 32' })
  readonly password: string;
}
