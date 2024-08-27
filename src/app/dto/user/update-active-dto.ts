import { ApiProperty } from '@nestjs/swagger';

export class UpdateActiveUserDto {
  @ApiProperty({
    default: true,
    example: true,
  })
  readonly isActive: boolean;
}
