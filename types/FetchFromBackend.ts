import { RequestMethod } from './http/RequestMethod';

export interface FetchWithAuthOptions {
  method?: RequestMethod; // HTTP method, e.g., GET, POST, PUT, DELETE
  url: string; // The URL to make the request to
  data?: unknown; // The request body (for POST/PUT requests)
  request?: Request; // The Next.js `Request` object (used for GET requests to extract query parameters)
  extractGetParams?: boolean; // Flag to indicate if GET parameters should be extracted from the URL
  successMessage?: string; // Custom success message to return with the response
  failureMessage?: string; // Custom failure message (default: "An error occurred while processing your request.")
  requireAuth?: boolean; // Flag to indicate if authentication (refresh token) is required (default: true)
  hasFile?: boolean; // Flag to indicate if the request involves file upload (sets `Content-Type` to `multipart/form-data`)
  headers?: Record<string, string>; // Additional custom headers for the request
  timeout?: number; // Timeout in milliseconds for the request (default: 10000 ms)
}
