import 'dotenv/config';
import z from 'zod';

const EnvSchema = z.object({
  NODE_ENV: z
    .enum(['local', 'development', 'production', 'test'])
    .default('local'),
  LISTEN_PORT: z.coerce.number().default(3000),
  DB_HOST: z.string(),
  DB_PORT: z.coerce.number(),
  DB_USER: z.string(),
  DB_PASS: z.string(),
  DB_NAME: z.string(),
  DB_LOGGING: z.union([z.literal('all'), z.boolean()]),
  FE_URL: z.string(),
});

type EnvType = z.infer<typeof EnvSchema>;

export let Env: EnvType;

const result = EnvSchema.safeParse(process.env);

if (!result.success) {
  const data = z.treeifyError(result.error);
  if (!data.properties) {
    console.error(
      'Environment variable validation failed:',
      JSON.stringify(data, null, 2),
    );
  }

  const errors: string[] = [];
  for (const [key, value] of Object.entries(data.properties!)) {
    errors.push(`- ${key}: ${value.errors.join(', ')}`);
  }
  throw new Error('Invalid environment variables:\n' + errors.join('\n'));
}

Env = result.data;

if (['local', 'development'].includes(Env.NODE_ENV)) {
  console.log(JSON.stringify(Env, null, 2));
}
