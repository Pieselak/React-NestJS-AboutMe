import 'dotenv/config';
import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  const documentConfig = new DocumentBuilder()
    .setTitle('Portfolio website API')
    .setDescription('API documentation for the portfolio website')
    .setVersion('1.0')
    .build();
  const documentFactory = () =>
    SwaggerModule.createDocument(app, documentConfig);
  SwaggerModule.setup('docs', app, documentFactory(), {
    jsonDocumentUrl: '/docs-json',
  });

  await app.listen(process.env.PORT ?? 3000);
  console.log(`Server started on port ${process.env.PORT}`);
}
bootstrap();
