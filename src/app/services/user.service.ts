import { UpdateUserDto } from './../dto/user/update-user.dto';
import { Global, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import * as bcrypt from 'bcrypt';
import { FlattenMaps, Model } from 'mongoose';
import { msgResponse, saltOrRounds } from 'src/common/constant';
import { User, UserDocument } from 'src/database/schemas/user.schema';
import { convertPagination } from 'src/utils/pagination';
import { ResponseListUser, UserFilter } from '../types/user';
import { CreateUserDto } from './../dto/user/create-user.dto';

@Global()
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async nextValueSequence() {
    try {
      const user = await this.userModel.findOne(
        {},
        {},
        {
          sort: { createdAt: -1 },
        },
      );
      return user ? user.id + 1 : 1;
    } catch (err) {
      throw new HttpException(msgResponse[400], HttpStatus.BAD_REQUEST);
    }
  }

  async getListUser(params: UserFilter): Promise<ResponseListUser> {
    try {
      const { page, limit } = convertPagination(params.page, params.limit);
      const total = await this.userModel.countDocuments();
      const user: FlattenMaps<User>[] = await this.userModel
        .find()
        .select('-_id -__v')
        .sort({
          id: -1,
        })
        .skip((page - 1) * limit)
        .limit(limit)
        .lean()
        .exec();
      return {
        data: user,
        pagination: {
          page,
          limit,
          total,
        },
      };
    } catch (err) {
      throw new HttpException(msgResponse[400], HttpStatus.BAD_REQUEST);
    }
  }

  async getDetailUserByField<T>(properties: keyof User, value: T) {
    const user = await this.userModel
      .findOne({
        [properties]: value,
      })
      .select('-_id -__v')
      .lean()
      .exec();
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    try {
      const id = await this.nextValueSequence();
      const password = await bcrypt.hash(createUserDto.password, saltOrRounds);
      const newUser = await new this.userModel({
        ...createUserDto,
        id,
        password,
      }).save();
      return await this.userModel
        .findOne({
          id: newUser.id,
        })
        .select('-_id -__v')
        .lean()
        .exec();
    } catch (err) {
      throw new HttpException(msgResponse[400], HttpStatus.BAD_REQUEST);
    }
  }

  async updateUser(id: string, updateUserDto: UpdateUserDto): Promise<User> {
    try {
      const user = await this.userModel
        .findOneAndUpdate(
          {
            id,
          },
          updateUserDto,
          {
            new: true,
          },
        )
        .select('-_id -__v')
        .exec();
      return user;
    } catch (err) {
      throw new HttpException(msgResponse[400], HttpStatus.BAD_REQUEST);
    }
  }

  async updateStatus(id: string, isActive: boolean): Promise<User> {
    try {
      const user = await this.userModel
        .findOneAndUpdate(
          {
            id,
          },
          {
            is_active: isActive,
          },
          {
            new: true,
          },
        )
        .exec();
      if (user) return user;
      return null;
    } catch (err) {
      throw new HttpException(msgResponse[400], HttpStatus.BAD_REQUEST);
    }
  }
  async updateUserByField<T>(
    id: string,
    properties: keyof User,
    value: T,
  ): Promise<User> {
    try {
      const user = await this.userModel
        .findOneAndUpdate(
          {
            id,
          },
          {
            $set: {
              [properties]: value,
            },
          },
          {
            new: true,
          },
        )
        .exec();
      if (user) return user;
      return null;
    } catch (err) {
      throw new HttpException(msgResponse[400], HttpStatus.BAD_REQUEST);
    }
  }
}
