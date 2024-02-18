import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './error/global.exceptrionFilter';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter);
  app.enableCors({
    credentials: true,
    origin: true
  });
  const config = new DocumentBuilder()
    .setTitle('ugizz example')
    .setDescription('The ugizz API description')
    .setVersion('1.0')
    .addTag('ugizz')
        //JWT 토큰 설정
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        name: 'JWT',
        in: 'header',
      },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(3000);
}
bootstrap();
