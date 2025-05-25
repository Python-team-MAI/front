export const ACCESS_TOKEN = "access_token";
export const REFRESH_TOKEN = "refresh_token";
export const USER = "user";
export const SESSION_TOKEN = "session_token";
export const ACCESS_TOKEN_EXPIRES_MINUTES = Number(process.env.ACCESS_TOKEN_EXPIRES) || 60;
export const REFRESH_TOKEN_EXPIRES_DAYS = Number(process.env.REFRESH_TOKEN_EXPIRES) || 1;
