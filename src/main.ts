import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // ! Global Middleware
  // * If we want to bind middleware to every registered route at once, we can use the use() method that is supplied by the INestApplication instance:
  // ? app.use(loggerMiddleware);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap()
  .then(() => console.log('Server is running...'))
  .catch((error) => console.error('Error starting the server:', error));
