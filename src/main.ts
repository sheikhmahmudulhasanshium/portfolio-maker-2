import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true, // Ensures DTOs are properly transformed
    }),
  );
  await app.listen(3000);
}

bootstrap().catch((err) => {
  console.error('Error during app bootstrap:', err);
});
