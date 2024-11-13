import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { msgResponse } from 'src/common/constant';
import { RoleService } from '../services/role.service';

@Injectable()
export class RoleNameExistsPipe implements PipeTransform {
  constructor(private readonly roleService: RoleService) {}

  async transform(value: any) {
    const role = await this.roleService.getDetailRoleByField(
      'role_name',
      value.role_name,
    );
    if (role) {
      throw new BadRequestException({
        statusCode: 400,
        message: msgResponse[422],
        errors: {
          role_name: msgResponse.exist.roleName,
        },
      });
    }

    return value;
  }
}
