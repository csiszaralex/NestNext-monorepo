import { CreatePostApiSchema } from '@repo/shared-types';
import { createZodDto } from 'nestjs-zod';

export class CreatePostDto extends createZodDto(CreatePostApiSchema) {}
