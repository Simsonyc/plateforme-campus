import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  schema: './src/core/infrastructure/db/schema',
  out: './src/core/infrastructure/db/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: 'postgresql://campus_user:campus_password@localhost:5432/plateforme_campus',
  },
  verbose: true,
  strict: true,
});