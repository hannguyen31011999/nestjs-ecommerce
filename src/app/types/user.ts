import { User } from 'src/database/schemas/user.schema';
import { BaseFilterList, BasePagination } from './common';

export interface UserFilter extends BaseFilterList {
  orderBy?: string;
}

export interface ResponseListUser {
  data: Array<User>;
  pagination: BasePagination;
}
