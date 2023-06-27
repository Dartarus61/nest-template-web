import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'user@mail.ru', description: 'Почта' })
  @IsString({ message: 'Должно быть строкой' })
  @IsEmail({}, { message: 'Некорректный email' })
  readonly email: string;

  @ApiProperty({ example: 12345, description: 'пароль' })
  @IsString({ message: 'Должно быть строкой' })
  @Length(6, 32, { message: 'Не меньше 6 и не больше 32' })
  readonly password: string;

  @ApiProperty({ example: 'Bob', description: 'Имя пользователя' })
  @IsString({ message: 'Должно быть строкой' })
  readonly name: string;
}
