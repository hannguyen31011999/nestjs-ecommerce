import {
  Get,
  Global,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import {
  Permission,
  PermissionDocument,
} from 'src/database/schemas/permission.schema';
import {
  IPermission,
  PermissionEnum,
  TypePermission,
} from '../types/permission';
import { msgResponse } from 'src/common/constant';

@Global()
@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(Permission.name)
    private readonly permissionModel: Model<PermissionDocument>,
  ) {}
  @Get()
  async getListPermission(): Promise<IPermission[]> {
    try {
      const permissions: TypePermission[] = await this.permissionModel.find();
      const tempObj = {};
      permissions.forEach((item: TypePermission) => {
        if (item.parent_id === PermissionEnum.root) {
          tempObj[item.id] = {
            permissions: permissions.filter(
              (val: TypePermission) => val.parent_id === item.id,
            ),
            ...item,
          };
        }
      });
      console.log('tempObj', tempObj);
      return [];
    } catch (err) {
      throw new HttpException(msgResponse[400], HttpStatus.BAD_REQUEST);
    }
  }
}
