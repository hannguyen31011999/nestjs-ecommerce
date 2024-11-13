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
  id: number;

  @Prop({
    type: Number,
  })
  parent_id: number;

  @Prop({
    type: String,
    unique: true,
  })
  permission_code: string;

  @Prop({
    type: String,
  })
  title: string;

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

export const PermissionSchema = SchemaFactory.createForClass(Permission);
