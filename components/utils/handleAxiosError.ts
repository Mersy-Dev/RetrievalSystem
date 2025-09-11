import { ApiErrorPayload } from '@/types/errorPayload';
import { AxiosError } from 'axios';

// Utility function for error handling
export const handleAxiosError = (
  error: unknown,
  defaultMessage: string = 'An unexpected error occurred. Please try again later.'
): ApiErrorPayload => {
  // ✅ Explicitly return the correct structure
  const axiosError = error as AxiosError<{ message?: string; error?: string }>;

  return {
    message:
      axiosError.response?.data?.message ||
      axiosError.response?.data?.error ||
      defaultMessage,
  };
};
