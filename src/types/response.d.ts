export interface TokenResponse {
  token: string;
  expires: Date;
}

export interface AuthTokensResponse {
  access: TokenResponse;
  refresh?: TokenResponse;
}

export interface PaginationResponse<T> {
  data: T[];
  hasNextPage: boolean;
}
