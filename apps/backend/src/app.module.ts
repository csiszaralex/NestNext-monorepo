import { Module } from '@nestjs/common';
import { AppConfigModule } from './common/configs/app-config.module';
import { AppConfigService } from './common/configs/app-config.service';
import { DatabaseModule } from './common/database/database.module';
import { PrismaService } from './common/database/prisma.service';
import { PostModule } from './post/post.module';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { APP_GUARD } from '@nestjs/core';

@Module({
  imports: [
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
    AppConfigModule,
    DatabaseModule,
    PostModule,
  ],
  //TODO: if proxy is used, enable behind proxy and set trust proxy in app.enable('trust proxy')
  providers: [{ provide: APP_GUARD, useClass: ThrottlerGuard }],
})
export class AppModule {}
