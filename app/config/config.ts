import dotenv from 'dotenv';

dotenv.config();

// app urls
export const APP_URL = process.env.NEXT_PUBLIC_APP_URL;
export const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
export const API_URL = `${API_BASE_URL}/api`;
export const AUTH_API_URL = `${API_URL}/auth`;

// token expiry
// export const ACCESS_TOKEN_EXPIRY = 60 * 15;
// export const REFRESH_TOKEN_EXPIRY_DAYS = 60 * 60 * 24 * 7; //7 DAYS
// export const OTHER_TOKEN_EXPIRY_DAYS = 60 * 60 * 24;

// export const DEFAULT_IMAGE = '/images/home/grad.jpg';

if (!API_BASE_URL || API_BASE_URL == '') {
  throw new Error(
    'Your "API_BASE_URL" is missing in your env! Please, check .env or .env.local'
  );
}

if (!APP_URL) {
  throw new Error(
    'Your "APP_URL" is missing in your env! Please, check .env or .env.local'
  );
}
