import { NestFactory } from '@nestjs/core';
import 'reflect-metadata';

import { AppModule } from './app.module';

async function bootstrap() {
  const port = process.env.PORT;
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'https://crm-fn.vercel.app/',
    credentials: true,
  });
  await app.listen(port);
}
bootstrap();
