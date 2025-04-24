declare type DatabaseProperties = {
  _id: string;
  createdAt: string;
  updatedAt: string;
};

declare type ErrorResponse = {
  message: string;
  code: number;
};

declare type SuccessfulResponse<T> = {
  message: string;
} & T;

declare type PaginatedResponse<T> = {
  metadata: {
    currentPage: number;
    totalPages: number;
    limit: number;
    totalItems: number;
  };
} & T;

declare type APIResponse<T> = SuccessfulResponse<T> | ErrorResponse;
