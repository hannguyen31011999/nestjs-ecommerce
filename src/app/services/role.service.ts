import {
  Global,
  HttpException,
  HttpStatus,
  Injectable,
  Post,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { msgResponse } from 'src/common/constant';
import { Role, RoleDocument } from 'src/database/schemas/role.schema';
import { CreateRoleDto } from '../dto/role/create-role.dto';
import { IRole } from '../types/role';

@Global()
@Injectable()
export class RoleService {
  constructor(
    @InjectModel(Role.name) private readonly roleModel: Model<RoleDocument>,
  ) {}

  async nextValueSequence() {
    const role = await this.roleModel.findOne(
      {},
      {},
      {
        sort: { createdAt: -1 },
      },
    );
    return role ? role.id + 1 : 1;
  }

  @Post()
  async createRole(createRoleDto: CreateRoleDto): Promise<IRole> {
    try {
      const id = await this.nextValueSequence();
      const newRole = await new this.roleModel({
        id,
        ...createRoleDto,
        deleted_at: false,
      });
      return newRole.save();
    } catch (err) {
      throw new HttpException(msgResponse[400], HttpStatus.BAD_REQUEST);
    }
  }
}
