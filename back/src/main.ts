import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      'http://localhost:3000',
      'https://reverta-ifacil.vercel.app',
      'https://reverta-ifacil-denerborges-projects.vercel.app',
    ],
    credentials: true,
  });

  app.setGlobalPrefix('/api/v1/');

  await app.listen(5000);
}
bootstrap();
