import {
  forwardRef,
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { jwtConstants, msgResponse } from 'src/common/constant';
import { BaseController } from '../controllers/base.controller';
import { UserService } from './user.service';
import { PermissionService } from './permission.service';
import { RoleService } from './role.service';
import { Role } from 'src/database/schemas/role.schema';
import { FlattenMaps } from 'mongoose';
import { User } from 'src/database/schemas/user.schema';

@Injectable()
export class AuthService extends BaseController {
  constructor(
    @Inject(forwardRef(() => UserService)) private userService: UserService,
    private permissionService: PermissionService,
    private roleService: RoleService,
    private jwtService: JwtService,
  ) {
    super(HttpStatus.BAD_REQUEST, msgResponse[400]);
  }

  async signIn(_email: string, _password: string) {
    try {
      const user = await this.userService.getDetailUserByField('email', _email);
      const role: FlattenMaps<Role> =
        await this.roleService.getDetailRoleByField('id', user.role_id);
      const permission = await this.permissionService.getPermissionByCollection(
        JSON.parse(role.permission_id),
      );
      if (!user) return this.getResponse(null);
      const isMatch = await bcrypt.compare(_password, user.password);
      if (!isMatch) return this.getResponse(null);
      const { accessToken, refreshToken } = await this.getTokens(user);
      await this.updateToken(user.id, accessToken, refreshToken);
      this.setter(HttpStatus.OK, msgResponse.signIn.success);
      const {
        id,
        role_id,
        email,
        full_name,
        phone_number,
        is_active,
        birth_date,
        avatar,
        address,
        gender,
        created_at,
        updated_at,
      } = user;
      return this.getResponse({
        accessToken,
        refreshToken,
        user: {
          id,
          role_id,
          email,
          full_name,
          phone_number,
          is_active,
          birth_date,
          avatar,
          address,
          gender,
          created_at,
          updated_at,
        },
        permission,
      });
    } catch (err) {
      throw new HttpException(msgResponse[400], HttpStatus.BAD_REQUEST);
    }
  }

  async logout(token: string) {
    let statusCode: number = HttpStatus.OK;
    let messageCode: string = msgResponse.signOut.success;
    const user = await this.userService.getDetailUserByField(
      'access_token',
      token,
    );
    if (!user) {
      statusCode = HttpStatus.BAD_REQUEST;
      messageCode = msgResponse.signOut.fail;
    }
    this.setter(statusCode, messageCode);
    return this.getResponse(null);
  }

  async updateToken(id: string, accessToken: string, refreshToken: string) {
    await this.userService.updateUserByField(id, 'access_token', accessToken);
    await this.userService.updateUserByField(id, 'refresh_token', refreshToken);
  }

  async refreshToken(token: string) {
    let statusCode: number = HttpStatus.OK;
    let messageCode: string = msgResponse.refreshToken.success;
    let data: { accessToken: string; refreshToken: string } | null = null;
    const user: User = await this.userService.getDetailUserByField(
      'refresh_token',
      token,
    );
    if (!user) {
      statusCode = HttpStatus.BAD_REQUEST;
      messageCode = msgResponse[400];
    } else {
      const { refreshToken, accessToken } = await this.getTokens(user);
      await this.updateToken(user.id.toString(), accessToken, refreshToken);
      data = { refreshToken, accessToken };
    }
    this.setter(statusCode, messageCode);
    return this.getResponse(data);
  }

  async getTokens({
    id,
    role_id,
    email,
    full_name,
    phone_number,
    is_active,
    birth_date,
    avatar,
    address,
    gender,
    created_at,
    updated_at,
  }: User) {
    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(
        {
          user: {
            id,
            role_id,
            email,
            full_name,
            phone_number,
            is_active,
            birth_date,
            avatar,
            address,
            gender,
            created_at,
            updated_at,
          },
        },
        {
          secret: jwtConstants.secret,
          expiresIn: jwtConstants.expired.access_token,
        },
      ),
      this.jwtService.signAsync(
        {},
        {
          secret: jwtConstants.secret,
          expiresIn: jwtConstants.expired.refresh_token,
        },
      ),
    ]);
    return {
      accessToken,
      refreshToken,
    };
  }
}
