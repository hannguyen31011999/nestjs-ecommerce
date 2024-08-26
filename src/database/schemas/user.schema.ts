import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Role } from './role.schema';

export type UserDocument = User & Document;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: true,
})
export class User {
  @Prop({
    type: Number,
    unique: true,
  })
  id;

  @Prop({
    type: Number,
  })
  role_id;

  @Prop({
    type: String,
    unique: true,
    maxlength: 255,
  })
  email;

  @Prop({
    type: String,
    maxlength: 255,
  })
  password;

  @Prop({
    type: String,
    maxlength: 255,
  })
  full_name;

  @Prop({
    type: String,
    unique: true,
    maxlength: 15,
  })
  phone_number;

  @Prop({
    type: Boolean,
  })
  is_active;

  @Prop({
    type: String,
  })
  access_token;

  @Prop({
    type: String,
  })
  birth_date;

  @Prop({
    type: String,
  })
  avatar;

  @Prop({
    type: String,
    maxlength: 255,
  })
  address;

  @Prop({
    type: Number,
  })
  gender;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.virtual('users', {
  ref: Role.name,
  localField: 'role_id',
  foreignField: 'id',
  justOne: true,
});
