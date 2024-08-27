import { ApiProperty } from '@nestjs/swagger';
import {
  IsBoolean,
  IsNotEmpty,
  IsNumber,
  IsString,
  MaxLength,
} from 'class-validator';

export class UpdateUserDto {
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
    default:
      'https://fastly.picsum.photos/id/237/200/300.jpg?hmac=TmmQSbShHz9CdQm0NkEjx1Dyh_Y984R9LpNrpvH2D_U',
    type: String,
  })
  @IsString()
  readonly avatar: string;
}
