import z from 'zod';

export const CreateSampleSchema = z.object({
  name: z.string().min(1).max(255),
  age: z.int().min(14).max(120),
});

export type CreateSampleDto = z.infer<typeof CreateSampleSchema>;
