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
  id: number;

  @Prop({
    type: Number,
  })
  role_id: number | null;

  @Prop({
    type: String,
    unique: true,
    maxlength: 255,
  })
  email: string;

  @Prop({
    type: String,
    maxlength: 255,
  })
  password: string;

  @Prop({
    type: String,
    maxlength: 255,
  })
  full_name: string;

  @Prop({
    type: String,
    unique: true,
    maxlength: 15,
  })
  phone_number: string;

  @Prop({
    type: Boolean,
  })
  is_active: boolean;

  @Prop({
    type: String,
  })
  access_token: string | null;

  @Prop({
    type: String,
  })
  refresh_token: string | null;

  @Prop({
    type: String,
  })
  birth_date: string | null;

  @Prop({
    type: String,
  })
  avatar: string | null;

  @Prop({
    type: String,
    maxlength: 255,
  })
  address: string | null;

  @Prop({
    type: Number,
  })
  gender: number;

  @Prop({
    type: String,
  })
  created_at: string;

  @Prop({
    type: String,
  })
  updated_at: string;
}

export const UserSchema = SchemaFactory.createForClass(User);

UserSchema.set('toJSON', {
  transform: (_, ret) => {
    delete ret._id;
    delete ret.__v;
    return ret;
  },
});

UserSchema.virtual('users', {
  ref: Role.name,
  localField: 'role_id',
  foreignField: 'id',
  justOne: true,
});
