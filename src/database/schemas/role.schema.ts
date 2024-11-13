import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from './user.schema';

export type RoleDocument = Role & Document;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: true,
})
export class Role {
  @Prop({
    type: Number,
    unique: true,
    auto: true,
  })
  id: number;

  @Prop({
    type: String,
    unique: true,
  })
  role_name: string;

  @Prop({
    type: String,
  })
  role_desc: string;

  @Prop({
    type: String,
  })
  permission_id: string;

  @Prop({
    type: String,
  })
  created_at: string;

  @Prop({
    type: String,
  })
  updated_at: string;

  @Prop({
    type: Boolean,
  })
  deleted_at: boolean;
}

export const RoleSchema = SchemaFactory.createForClass(Role);

RoleSchema.virtual('User', {
  ref: () => User.name,
  localField: 'id',
  foreignField: 'role_id',
  justOne: false,
});
