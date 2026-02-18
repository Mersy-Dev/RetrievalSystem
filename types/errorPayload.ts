export interface ApiErrorPayload {
  message: string;
  status?: number;
  errors?: Record<string, string[]>;
  // add whatever fields your API actually returns
}
export interface BackendErrorResponse {
  rejectValue: ApiErrorPayload;
}
