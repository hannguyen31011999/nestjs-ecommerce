import { Global, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FlattenMaps, Model } from 'mongoose';
import { msgResponse } from 'src/common/constant';
import {
  Permission,
  PermissionDocument,
} from 'src/database/schemas/permission.schema';
import {
  IPermission,
  PermissionEnum,
  TypePermission,
} from '../types/permission';

@Global()
@Injectable()
export class PermissionService {
  constructor(
    @InjectModel(Permission.name)
    private readonly permissionModel: Model<PermissionDocument>,
  ) {}

  async getListPermission(): Promise<IPermission[]> {
    try {
      const permissions: TypePermission[] = await this.permissionModel.find();
      const tempObj = {};
      permissions.forEach((parentItem: TypePermission) => {
        const {
          id,
          parent_id,
          permission_code,
          title,
          created_at,
          updated_at,
          deleted_at,
        } = parentItem.toObject();
        if (parent_id === PermissionEnum.root) {
          const tempPermission: IPermission[] = [];
          permissions.forEach((item: TypePermission) => {
            const subItem = item.toObject();
            if (subItem.parent_id === id) {
              tempPermission.push({
                id: subItem.id,
                parent_id: subItem.parent_id,
                permission_code: subItem.permission_code,
                title: subItem.title,
                created_at: subItem.created_at,
                updated_at: subItem.updated_at,
                deleted_at: subItem.deleted_at,
                permissions: permissions.filter((childItem: TypePermission) => {
                  if (childItem.parent_id == subItem.id) {
                    return childItem;
                  }
                }),
              });
            }
          });
          tempObj[id] = {
            id,
            parent_id,
            permission_code,
            title,
            created_at,
            updated_at,
            deleted_at,
            permissions: [...tempPermission],
          };
        }
      });
      const dataPermission: IPermission[] = Object.keys(tempObj).map(
        (key) => tempObj[key],
      );
      return dataPermission;
    } catch (err) {
      throw new HttpException(msgResponse[400], HttpStatus.BAD_REQUEST);
    }
  }

  async getPermissionByCollection(
    permissionId: number[],
  ): Promise<FlattenMaps<Permission>[]> {
    try {
      const permission = await this.permissionModel
        .find({
          id: { $in: permissionId },
        })
        .lean()
        .exec();
      return permission.map(
        ({
          id,
          parent_id,
          permission_code,
          title,
          created_at,
          updated_at,
          deleted_at,
        }: FlattenMaps<PermissionDocument>) => ({
          id,
          parent_id,
          permission_code,
          title,
          created_at,
          updated_at,
          deleted_at,
        }),
      );
    } catch (e) {
      throw new HttpException(msgResponse[400], HttpStatus.BAD_REQUEST);
    }
  }
}
