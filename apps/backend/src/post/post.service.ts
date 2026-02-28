import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../common/database/prisma.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostService {
  private readonly logger = new Logger(PostService.name);

  constructor(private readonly prisma: PrismaService) {}

  async create(createPostDto: CreatePostDto) {
    const newPost = await this.prisma.post.create({ data: createPostDto });
    this.logger.log(`Poszt sikeresen létrehozva. ID: ${newPost.id}`);
    return newPost;
  }

  async findAll() {
    return this.prisma.post.findMany({ orderBy: { id: 'desc' } });
  }

  async findOne(id: number) {
    return this.prisma.post.findUniqueOrThrow({ where: { id } });
  }

  async update(id: number, updatePostDto: UpdatePostDto) {
    const updatedPost = await this.prisma.post.update({
      where: { id },
      data: updatePostDto,
    });
    this.logger.log(`Poszt frissítve. ID: ${id}`);
    return updatedPost;
  }

  async remove(id: number) {
    const deletedPost = await this.prisma.post.delete({ where: { id } });
    this.logger.log(`Poszt törölve. ID: ${id}`);
    return deletedPost;
  }
}
