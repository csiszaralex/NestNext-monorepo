import { PostUpdateInputObjectSchema } from '@repo/shared-types';
import { createZodDto } from 'nestjs-zod';

export class UpdatePostDto extends createZodDto(PostUpdateInputObjectSchema) {}
