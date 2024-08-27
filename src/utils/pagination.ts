import { defaultPagination } from 'src/common/constant';

export const convertPagination = <TPage, TLimit>(
  pageValue: TPage,
  limitValue: TLimit,
): { page: number; limit: number } => {
  const page = Number.isNaN(pageValue) ? defaultPagination.page : +pageValue;
  const limit = Number.isNaN(limitValue) ? defaultPagination.page : +limitValue;
  return { page, limit };
};
