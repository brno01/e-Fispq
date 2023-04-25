import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import './envs';
const packageFile = require('../package.json');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bufferLogs: true,
    cors: true,
    snapshot: true,
  });
  const config = new DocumentBuilder()
    .setTitle(`e-Fispq`)
    .setDescription('Back-end e-Fispq project')
    .setVersion(packageFile.version)
    .addBearerAuth()
    .addTag('Endpoints:')
    .build();

  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  app.enableVersioning()
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
