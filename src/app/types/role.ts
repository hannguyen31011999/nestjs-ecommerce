import { Document } from 'mongoose';
import { BaseFilterList, BasePagination } from './common';

export interface IRole extends Document {
  readonly id: number;
  readonly role_name: string;
  readonly role_desc: string;
  readonly permission_id: string;
  readonly deleted_at: boolean;
  readonly created_at: string;
  readonly updated_at: string;
}

export interface RoleFilter extends BaseFilterList {
  orderBy?: string;
}

export interface ResponseListUser {
  data: Array<IRole>;
  pagination: BasePagination;
}
