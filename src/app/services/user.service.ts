import { CreateUserDto } from './../dto/user/create-user.dto';
import { Global, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/database/schemas/user.schema';
import { IUser } from '../types/user';

@Global()
@Injectable()
export class UserService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}

  async nextValueSequence() {
    const user = await this.userModel.findOne(
      {},
      {},
      {
        sort: { createdAt: -1 },
      },
    );
    console.log('user', user);
    return user ? user.id + 1 : 1;
  }

  async getDetailUserByField<T>(field: string, value: T) {
    const user = await this.userModel.findOne({
      [field]: value,
    });
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<IUser> {
    const id = await this.nextValueSequence();
    const user = await this.getDetailUserByField('email', createUserDto.email);
    if (!user) {
      const newUser = await new this.userModel({
        ...createUserDto,
        id,
      });
      return newUser.save();
    }
    console.log('user', user);
    throw new HttpException('Validation failed', HttpStatus.BAD_REQUEST);
  }
}
