import { Module } from '@nestjs/common';
import { AuthController } from 'src/app/controllers/auth.controller';
import { AuthService } from 'src/app/services/auth.service';
import { AccessTokenStrategy } from 'src/app/strategies/access-token.strategy';
import { RefreshTokenStrategy } from 'src/app/strategies/refresh-token.strategy';
import { UserModule } from './user.module';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { jwtConstants } from 'src/common/constant';

@Module({
  imports: [
    UserModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AccessTokenStrategy,
    RefreshTokenStrategy,
    AuthService,
    JwtService,
  ],
  exports: [AuthService],
})
export class AuthModule {}
