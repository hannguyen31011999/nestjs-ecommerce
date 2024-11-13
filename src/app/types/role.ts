import { Role } from 'src/database/schemas/role.schema';
import { BaseFilterList, BasePagination } from './common';

export interface RoleFilter extends BaseFilterList {
  orderBy?: string;
}

export interface ResponseListRole {
  data: Array<Role>;
  pagination: BasePagination;
}
