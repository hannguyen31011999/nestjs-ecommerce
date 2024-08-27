import { ApiProperty } from '@nestjs/swagger';

export class SignInDto {
  @ApiProperty({
    default: 'example@gmail.com',
    example: 'example@gmail.com',
  })
  readonly email: string;

  @ApiProperty({
    default: '123456',
    example: '123456',
  })
  readonly password: string;
}
