export interface PageResponse<T> {
  content: T[];
  size: number;
  number: number;
  totalPages: number;
  pageable: Pageable;
  last: boolean;
  totalElements: number;
  sort: Sort;
  first: boolean;
  numberOfElements: number;
  empty: boolean;
}

interface Pageable {
  pageNumber: number;
  pageSize: number;
  sort: Sort;
  offset: number;
  upaged: boolean;
  paged: boolean;
}

interface Sort {
  empty: boolean;
  unsorted: boolean;
  sorted: boolean;
}
