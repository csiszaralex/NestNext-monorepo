import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),
  PORT: z.coerce.number().default(3000),
  DATABASE_URL: z.string(),
  FRONTEND_URL: z.url().default('*'),
});

export type EnvConfig = z.infer<typeof envSchema>;

export const validate = (config: Record<string, unknown>) => {
  const result = envSchema.safeParse(config);
  if (!result.success) {
    console.error('❌ Invalid environment variables:', z.treeifyError(result.error));
    throw new Error('Invalid environment variables');
  }
  return result.data;
};
