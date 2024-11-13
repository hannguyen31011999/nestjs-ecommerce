import { Global, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { msgResponse } from 'src/common/constant';
import { Role, RoleDocument } from 'src/database/schemas/role.schema';
import { CreateRoleDto } from '../dto/role/create-role.dto';
import { UserFilter } from '../types/user';
import { convertPagination } from 'src/utils/pagination';
import { UpdateRoleDto } from '../dto/role/update-role-dto';

@Global()
@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>,
  ) {}

  async nextValueSequence() {
    try {
      const role = await this.roleModel.findOne(
        {},
        {},
        {
          sort: { createdAt: -1 },
        },
      );
      return role ? role.id + 1 : 1;
    } catch (err) {
      throw new HttpException(msgResponse[400], HttpStatus.BAD_REQUEST);
    }
  }

  async getListRole(params: UserFilter) {
    try {
      const { page, limit } = convertPagination(params.page, params.limit);
      const total = await this.roleModel.countDocuments();
      const data = await this.roleModel
        .find()
        .select('-_id -__v')
        .where('deleted_at', false)
        .sort({
          id: -1,
        })
        .skip((page - 1) * limit)
        .limit(limit);
      return {
        data,
        pagination: {
          page,
          limit,
          total,
        },
      };
    } catch (e) {
      throw new HttpException(msgResponse[400], HttpStatus.BAD_REQUEST);
    }
  }

  async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
    try {
      const id = await this.nextValueSequence();
      const newRole = await new this.roleModel({
        id,
        ...createRoleDto,
        deleted_at: false,
      }).save();
      return await this.roleModel
        .findById(newRole._id)
        .select('-_id -__v')
        .exec();
    } catch (err) {
      throw new HttpException(msgResponse[400], HttpStatus.BAD_REQUEST);
    }
  }

  async getDetailRoleByField<T>(properties: keyof Role, value: T) {
    try {
      const role = await this.roleModel
        .findOne({
          [properties]: value,
        })
        .select('-_id -__v')
        .lean()
        .exec();
      return role;
    } catch (e) {
      throw new HttpException(msgResponse[400], HttpStatus.BAD_REQUEST);
    }
  }

  async updateRole(id: string, updateRoleDto: UpdateRoleDto): Promise<Role> {
    try {
      const updateRole = await this.roleModel
        .findOneAndUpdate(
          {
            id,
          },
          updateRoleDto,
          {
            new: true,
          },
        )
        .select('-_id -__v')
        .exec();
      return updateRole;
    } catch (e) {
      throw new HttpException(msgResponse[400], HttpStatus.BAD_REQUEST);
    }
  }

  async deleteRole(id: string) {
    try {
      const deleteRole = await this.roleModel
        .findOneAndUpdate(
          {
            id,
          },
          {
            deleted_at: true,
          },
          {
            new: true,
          },
        )
        .select('-_id -__v')
        .exec();
      return deleteRole;
    } catch (e) {
      throw new HttpException(msgResponse[400], HttpStatus.BAD_REQUEST);
    }
  }
}
