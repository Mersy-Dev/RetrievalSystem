import { handleAxiosError } from '@/components/utils/handleAxiosError';
import { ApiResponse } from '@/types/APIresponse';
import { FetchWithAuthOptions } from '@/types/FetchFromBackend';
import { RequestMethod } from '@/types/http/RequestMethod';
import axios, { AxiosRequestConfig, Method as AxiosMethod } from 'axios';
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';






export async function fetchFromBackend<T = unknown>({
  method = RequestMethod.POST,
  url,
  data,
  request,
  extractGetParams = true,
  successMessage = 'Request successful.',
  failureMessage = 'An error occurred while processing your request.',
  requireAuth = true,
  hasFile = false,
  headers = {},
  timeout = 10_000,
}: FetchWithAuthOptions): Promise<NextResponse<ApiResponse<T>>> {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get('refreshToken')?.value;

    if (!refreshToken && requireAuth) {
      const response: ApiResponse<T> = {
        success: false,
        message: 'Please log in again to continue.',
        error: 'Missing refresh token in cookies',
      };
      return NextResponse.json(response, { status: 401 });
    }

    if (request && !data && method === RequestMethod.GET && extractGetParams) {
      const { searchParams } = new URL(request.url);
      const params: Record<string, string> = {};
      searchParams.forEach((value, key) => {
        params[key] = value;
      });
      data = params;
    }

    const config: AxiosRequestConfig = {
      method: method as AxiosMethod,
      url,
      headers: {
        ...(refreshToken && { Authorization: `Bearer ${refreshToken}` }),
        ...(hasFile
          ? { 'Content-Type': 'multipart/form-data' }
          : { 'Content-Type': 'application/json' }),
        ...headers,
      },
      withCredentials: true,
      timeout,
      ...(method === RequestMethod.GET ? { params: data } : { data }),
    };

    const response = await axios<T>(config);

    const successResponse: ApiResponse<T> = {
      success: true,
      message: successMessage,
      data: response.data,
    };

    return NextResponse.json(successResponse, { status: response.status });
  } catch (error) {
    const axiosError = handleAxiosError(error, failureMessage).message;
    const errorResponse: ApiResponse<T> = {
      success: false,
      message: axiosError,
    };
    return NextResponse.json(errorResponse, { status: 500 });
  }
}
