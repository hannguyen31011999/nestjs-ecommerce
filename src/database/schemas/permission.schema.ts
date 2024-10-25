import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type PermissionDocument = Permission & Document;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: true,
})
export class Permission {
  @Prop({
    type: Number,
    unique: true,
    auto: true,
  })
  id;

  @Prop({
    type: Number,
  })
  parent_id;

  @Prop({
    type: String,
    unique: true,
  })
  permission_code;

  @Prop({
    type: String,
  })
  title;

  @Prop({
    type: Boolean,
  })
  deleted_at;
}

export const PermissionSchema = SchemaFactory.createForClass(Permission);
