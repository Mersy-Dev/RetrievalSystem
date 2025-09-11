export interface ApiErrorPayload {
  message: string; // Message to be used in the payload
}

export interface BackendErrorResponse {
  rejectValue: ApiErrorPayload;
}
