import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    default: 'supperadmin@gmail.com',
    example: 'supperadmin@gmail.com',
  })
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    default: '123456',
    example: '123456',
  })
  readonly password: string;
}
