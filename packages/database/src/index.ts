import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from './generated/client/client';

export class BasePrismaClient extends PrismaClient {
  constructor(connectionString: string) {
    const adapter = new PrismaPg({ connectionString });
    super({
      adapter,
      log: [
        { emit: 'event', level: 'query' },
        { emit: 'event', level: 'error' },
        { emit: 'event', level: 'info' },
        { emit: 'event', level: 'warn' },
      ],
    });
  }
}

export * from './generated/client/client';
export * from './generated/zod/schemas';
