import { Document } from 'mongoose';
import { BaseFilterList, BasePagination } from './common';

export interface TypePermission extends Document {
  readonly id: number;
  readonly parent_id: number;
  readonly permission_code: string;
  readonly title: string;
  readonly deleted_at: boolean;
  readonly created_at: string;
  readonly updated_at: string;
}

export interface IPermission extends TypePermission {
  readonly permissions: TypePermission[];
}

export interface PermissionFilter extends BaseFilterList {
  orderBy?: string;
}

export interface ResponseListUser {
  data: Array<IPermission>;
  pagination: BasePagination;
}

export enum PermissionEnum {
  root = 1,
}
