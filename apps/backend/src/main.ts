import { INestApplication, VersioningType } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerCustomOptions, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { ZodValidationPipe } from 'nestjs-zod';
import { AppModule } from './app.module';
import { AppConfigService } from './common/configs/app-config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(AppConfigService);
  const port = configService.get('PORT');

  app.use(helmet());

  app.useGlobalPipes(new ZodValidationPipe());

  app.enableCors({
    origin: configService.get('FRONTEND_URL'),
    credentials: true,
  });
  app.enableVersioning({
    type: VersioningType.URI,
    defaultVersion: '1',
  });

  setupSwagger(app);
  app.enableShutdownHooks();
  await app.listen(port);
}

function setupSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('API docs')
    .setDescription('The api docs for the api')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const customOptions: SwaggerCustomOptions = {
    customSiteTitle: 'API Docs',
    customCss: '.swagger-ui .topbar { display: none }',
  };

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, customOptions);
}

bootstrap();
