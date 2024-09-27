import { ApiProperty } from '@nestjs/swagger';
import { IsEmpty, IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateRoleDto {
  @ApiProperty({
    default: 'Supper admin',
    type: String,
  })
  @IsString()
  @IsNotEmpty()
  @MaxLength(255)
  readonly role_name: string;

  @ApiProperty({
    default: '',
    type: String,
  })
  @IsEmpty()
  @IsString()
  @MaxLength(255)
  readonly role_desc: string;
}
