import { Module } from '@nestjs/common';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import { LoggerModule } from 'nestjs-pino';
import { AppConfigModule } from './common/configs/app-config.module';
import { AppConfigService } from './common/configs/app-config.service';
import { DatabaseModule } from './common/database/database.module';
import { PostModule } from './post/post.module';
import { getLoggerConfig } from './common/configs/logger.config';
import { GlobalExceptionFilter } from './common/filters/global-exception.filter';

@Module({
  imports: [
    ThrottlerModule.forRoot([{ ttl: 60000, limit: 100 }]),
    LoggerModule.forRootAsync({
      inject: [AppConfigService],
      useFactory: async (config: AppConfigService) => getLoggerConfig(config),
    }),
    AppConfigModule,
    DatabaseModule,
    PostModule,
  ],
  //TODO: if proxy is used, enable behind proxy and set trust proxy in app.enable('trust proxy')
  providers: [
    { provide: APP_GUARD, useClass: ThrottlerGuard },
    { provide: APP_FILTER, useClass: GlobalExceptionFilter },
  ],
})
export class AppModule {}
