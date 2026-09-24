import { DataSourceOptions } from 'typeorm';
import { Env } from '../utils/env.js';

export const datasourceOptions: DataSourceOptions = {
  type: 'mysql',
  host: Env.DB_HOST,
  port: Env.DB_PORT,
  username: Env.DB_USER,
  password: Env.DB_PASS,
  database: Env.DB_NAME,
  logging: Env.DB_LOGGING,
} as const;
