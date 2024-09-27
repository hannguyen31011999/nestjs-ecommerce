import { Document } from 'mongoose';
import { BaseFilterList, BasePagination } from './common';

export interface IUser extends Document {
  readonly id: number;
  readonly role_id: number | null;
  readonly email: string;
  readonly password: string;
  readonly full_name: string;
  readonly phone_number: string;
  readonly is_active: boolean;
  readonly access_token: string | null;
  readonly refresh_token: string | null;
  readonly birth_date: string | null;
  readonly avatar: string | null;
  readonly address: string | null;
  readonly gender: number;
  readonly created_at: string;
  readonly updated_at: string;
}

export interface UserFilter extends BaseFilterList {
  orderBy?: string;
}

export interface ResponseListUser {
  data: Array<IUser>;
  pagination: BasePagination;
}
