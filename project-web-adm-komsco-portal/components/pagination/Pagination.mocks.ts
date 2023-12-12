import { IPagination } from './Pagination';

const base: IPagination = {
  total: 100,
  limit: 10,
  page: 1,
  pageClick: (page: number) => {
    console.log(page);
    return;
  },
};

export const mockProps = {
  base,
};
