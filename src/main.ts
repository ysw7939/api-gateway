import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionFilter } from './error/global.exceptrionFilter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalFilters(new GlobalExceptionFilter);
  app.enableCors({
    credentials: true,
    origin: true
  })
  await app.listen(3000);
}
bootstrap();
