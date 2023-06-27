export const DATABASE_URL =
  process.env.DATABASE_URL ||
  'postgresql://postgres:postgres@localhost:5433/prize?schema=public';

export const PRIVATE_KEY = process.env.PRIVATE_KEY || 'qwerty12345';

export const AWS_BUCKET_NAME = 'grant-pool';
export const SIGN_URL_EXPIRES = process.env.SIGN_URL_EXPIRES || '3600';
export const SMTP_HOST = 'smtp.mail.ru';
export const SMTP_PORT = 465;
export const SMTP_USER = 'dobropremia.geryon.space@mail.ru';
export const SMTP_PASSWORD = 'swxNXH00cDnLrYtjzFP1';

export const MAX_UPLOAD_SIZE = parseInt(process.env.MAX_UPLOAD_SIZE) || 50;

export const PORT = 5000;
