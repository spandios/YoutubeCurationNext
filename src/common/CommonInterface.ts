export interface DefaultState {
  error: string | null;
  isLoading: boolean;
}

export interface DefaultLastPageMetadata {
  scroll: number;
  page: number;
}

export interface PaginationInterface<T> {
  items: T[];
  meta: PaginationMeta;
  links: IPaginationLinks;
}

export interface PaginationMeta {
  /**
   * the amount of items on this specific page
   */
  itemCount: number;
  /**
   * the total amount of items
   */
  totalItems: number;
  /**
   * the amount of items that were requested per page
   */
  itemsPerPage: number;
  /**
   * the total amount of pages in this paginator
   */
  totalPages: number;
  /**
   * the current page this paginator "points" to
   */
  currentPage: number;
}

export interface IPaginationOptions {
  /**
   * the amount of items to be requested per page
   */
  limit: number | string;
  /**
   * the page that is requested
   */
  page: number | string;
  /**
   * a babasesic route for generating links (i.e., WITHOUT query params)
   */
  route?: string;
}

export interface IPaginationLinks {
  /**
   * a link to the "first" page
   */
  first?: string;
  /**
   * a link to the "previous" page
   */
  previous?: string;
  /**
   * a link to the "next" page
   */
  next?: string;
  /**
   * a link to the "last" page
   */
  last?: string;
}

export interface CommonModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm?: (data: any) => void;
  canConfirm?: boolean;
  confirmText?: string;
  cancelText?: string;
  title?: string;
  mobileHeaderDisable?: boolean;
}
