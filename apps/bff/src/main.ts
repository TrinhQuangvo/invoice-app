/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */

import { Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const globalPrefix = AppModule.GLOBAL_PREFIX;
  app.setGlobalPrefix(globalPrefix);
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    })
  );
  const port = AppModule.PORT || 3400;

  const config = new DocumentBuilder()
    .setTitle('E-invoice-bff API')
    .setDescription('The E-invoice-bff API description')
    .setVersion('1.0.0')
    .addBearerAuth({
      description: 'Default JWT Authorization',
      type: 'http',
      in: 'header',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'Authorization',
    })
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup(`${globalPrefix}/docs`, app, documentFactory);

  await app.listen(port);
  Logger.log(
    `🚀 Application is running on: http://localhost:${port}/${globalPrefix}`
  );
}

bootstrap();
