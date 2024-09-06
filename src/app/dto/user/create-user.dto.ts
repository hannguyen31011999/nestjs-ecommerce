import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty({
    default: 'example@gmail.com',
    type: String,
  })
  @IsEmail()
  @IsString()
  @MaxLength(100)
  @IsNotEmpty({})
  readonly email: string;

  @ApiProperty({
    default: '123456',
    type: String,
  })
  @IsString()
  @MaxLength(100)
  @MinLength(6)
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty({
    default: 'Example',
    type: String,
  })
  @IsString()
  @MaxLength(255)
  @IsNotEmpty()
  readonly full_name: string;

  @ApiProperty({
    default: '84828282828',
    type: String,
  })
  @IsString()
  @MaxLength(15)
  @IsNotEmpty()
  readonly phone_number: string;

  @ApiProperty({
    default: -1,
    type: Number,
  })
  @IsNumber()
  readonly role_id: number;

  @ApiProperty({
    default: false,
    type: Boolean,
  })
  @IsBoolean()
  @IsNotEmpty()
  readonly is_active: boolean;

  @ApiProperty({
    default: '1998-12-12',
    type: String,
  })
  @IsString()
  readonly birth_date: string;

  @ApiProperty({
    default: 'Address example',
    type: String,
  })
  @IsString()
  @MaxLength(255)
  readonly address: string;

  @ApiProperty({
    default: 2,
    type: Number,
  })
  @IsNumber()
  @IsNotEmpty()
  readonly gender: number;

  @ApiProperty({
    default: '',
    type: String,
  })
  @IsString()
  readonly access_token: string;

  @ApiProperty({
    default: '',
    type: String,
  })
  @IsString()
  readonly refresh_token: string;

  @ApiProperty({
    default:
      'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
    type: String,
  })
  @IsString()
  readonly avatar: string;
}
