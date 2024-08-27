export interface BaseResponse {
  statusCode: number;
  message: string;
}

export interface BasePagination {
  page: number;
  limit: number;
  total: number;
}

export interface BaseFilterList {
  page: number | string;
  limit: number | string;
}
