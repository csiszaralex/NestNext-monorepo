import { Module } from '@nestjs/common';
import { AppConfigModule } from './common/configs/app-config.module';
import { AppConfigService } from './common/configs/app-config.service';
import { DatabaseModule } from './common/database/database.module';
import { PrismaService } from './common/database/prisma.service';

@Module({
  imports: [AppConfigModule, DatabaseModule],
  exports: [AppConfigService, PrismaService],
})
export class AppModule {}
