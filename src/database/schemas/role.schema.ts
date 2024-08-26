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
  id;

  @Prop({
    type: String,
    unique: true,
  })
  role_name;

  @Prop({
    type: String,
  })
  role_desc;

  @Prop({
    type: String,
  })
  permission_id;

  @Prop({
    type: Boolean,
  })
  deleted_at;
}

export const RoleSchema = SchemaFactory.createForClass(Role);

RoleSchema.virtual('User', {
  ref: () => User.name,
  localField: 'id',
  foreignField: 'role_id',
  justOne: false,
});
