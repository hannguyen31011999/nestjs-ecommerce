import { Document } from 'mongoose';
import { BaseFilterList, BasePagination } from './common';

export interface TypePermission extends Document {
  readonly _id: string;
  readonly id: number;
  readonly parent_id: number;
  readonly permission_code: string;
  readonly title: string;
  readonly deleted_at: boolean;
  readonly created_at: string;
  readonly updated_at: string;
}

export interface IPermission
  extends Pick<
    TypePermission,
    | 'id'
    | 'parent_id'
    | 'permission_code'
    | 'title'
    | 'created_at'
    | 'updated_at'
    | 'deleted_at'
  > {
  readonly permissions:
    | Pick<
        TypePermission,
        | 'id'
        | 'parent_id'
        | 'permission_code'
        | 'title'
        | 'created_at'
        | 'updated_at'
        | 'deleted_at'
      >[]
    | null;
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
