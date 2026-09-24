import { DataSource } from 'typeorm';
import { datasourceOptions } from '../datasource-options.js';
import path from 'path';

export const datasource = new DataSource({
  ...datasourceOptions,
  migrations: [path.join(process.cwd(), 'src/db/migrate/migrations/*.ts')],
  entities: [path.join(process.cwd(), 'src/db/entities/*.ts')],
});
