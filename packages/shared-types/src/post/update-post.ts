import { z } from 'zod';
import { CreatePostApiSchema } from './create-post';

export const UpdatePostApiSchema = CreatePostApiSchema.partial();

export type TUpdatePostApiSchema = z.infer<typeof UpdatePostApiSchema>;
