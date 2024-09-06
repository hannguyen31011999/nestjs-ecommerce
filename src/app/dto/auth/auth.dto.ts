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

export class RefreshTokenDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    default: '',
    example:
      'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7Il9pZCI6IjY2ZGFhMGI4ZGE5NDk3MjQ3MzMyNjM1YSIsImlkIjoxLCJyb2xlX2lkIjoxLCJlbWFpbCI6InN1cHBlcmFkbWluQGdtYWlsLmNvbSIsInBhc3N3b3JkIjoiJDJiJDEwJEU2RHRGRzZMRktHeVlaUHE4aldFbU9lbXFaMnVZU0dlQ0tEaFlMSWZpckZaRW5oaGg1aHhHIiwiZnVsbF9uYW1lIjoiU3VwcGVyIGFkbWluIiwicGhvbmVfbnVtYmVyIjoiODQ4MjgyODI4MjgiLCJpc19hY3RpdmUiOnRydWUsImFjY2Vzc190b2tlbiI6IiIsInJlZnJlc2hfdG9rZW4iOiIiLCJiaXJ0aF9kYXRlIjoiMTk5OC0xMi0zMSIsImF2YXRhciI6Imh0dHBzOi8vc2NvbnRlbnQuZnNnbjItNC5mbmEuZmJjZG4ubmV0L3YvdDM5LjMwODA4LTEvNDQ5MDc1Nzg5XzM5NTY5NDEwMjEyMDQ1NjRfNTg5MDIyNjM3NzgxNTE0OTYxNV9uLmpwZz9zdHA9ZHN0LWpwZ19zMjAweDIwMCZfbmNfY2F0PTEwMSZjY2I9MS03Jl9uY19zaWQ9MGVjYjliJl9uY19ldWkyPUFlR1pPRFdFU1E0bVZYZGRhbjN4RXRNTXBEeng3ZnNSb0VLa1BQSHQteEdnUW9YSEI5VXJqbnBEay1ERWVydll6R2dka2VSeTBOcU0xcDZDRXBURFZpOGEmX25jX29oYz1KU1ltcDhYSUM2TVE3a052Z0UwNlFmLSZfbmNfaHQ9c2NvbnRlbnQuZnNnbjItNC5mbmEmb2g9MDBfQVlDdWFxN2hBNEV4NHJxcE5qU2VaYkR1alBqSVMxcjM0Q011a0Q0MXR2QmRCdyZvZT02NkUwNjRFNyIsImFkZHJlc3MiOiIxNTQgU3RyZWV0LCBUYW4gUGh1IFdhcmRzLCBUaHUgRHVjIENpdHkiLCJnZW5kZXIiOjEsImNyZWF0ZWRBdCI6IjIwMjQtMDktMDZUMDY6Mjc6MDQuOTQwWiIsInVwZGF0ZWRBdCI6IjIwMjQtMDktMDZUMDY6Mjc6MDQuOTQwWiIsIl9fdiI6MH0sImlhdCI6MTcyNTYwNTQwNywiZXhwIjoxNzI1NjA5MDA3fQ.fpHM8Zz2OXiWDGW5MaaRUxB36qiy9zZ1Kc5j0Y0vQXg',
  })
  readonly refresh_token: string;
}
