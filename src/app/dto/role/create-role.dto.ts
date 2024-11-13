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

  @ApiProperty({
    default:
      '[2,20,21,22,23,24,25,26,27,3,30,31,32,33,34,40,41,42,43,44,50,51,52,52,53,54,60,61,62,63,64,65,66,4,70,71,72,73,74]',
    type: String,
  })
  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  readonly permission_id: string;
}
