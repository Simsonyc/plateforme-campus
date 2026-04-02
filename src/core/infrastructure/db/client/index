import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: 'postgresql://campus_user:campus_password@localhost:5432/plateforme_campus',
});

export const db = drizzle(pool);