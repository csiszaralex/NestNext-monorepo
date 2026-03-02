import { z } from 'zod';
import { PostModelSchema } from '@repo/database';

export const CreatePostApiSchema = PostModelSchema.omit({
  id: true,
  // createdAt: true,
}).extend({
  title: z.string().min(1, 'Title is required').max(255),
});
export type TCreatePostApiSchema = z.infer<typeof CreatePostApiSchema>;

export const PostResponseApiSchema = PostModelSchema;
export type TPostResponseApiSchema = z.infer<typeof PostResponseApiSchema>;
