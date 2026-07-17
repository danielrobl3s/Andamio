import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { auth } from './lib/auth';
import { toNodeHandler } from 'better-auth/node';
import cookieParser from 'cookie-parser'
import { Expose } from 'class-transformer';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });


  app.getHttpAdapter().getInstance().set('trust proxy', 1);

  app.enableCors({
    origin: [
      "http://localhost:3001",
      "http://localhost:5173",
      "https://andamio-frontend.vercel.app",
      "https://andamiohub.com",
      "https://www.andamiohub.com"
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Cookie'],
  });

  app.use(cookieParser());
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true
  }))

  app.use((req: any, _res: any, next: any) => {
    console.log(`[${req.method}] ${req.url}`);
    console.log('Headers:', req.headers);
    console.log('COOKIES:', req.headers.cookie);
    console.log('Body:', req.body);
    next();
  });
  
  await app.listen(8080);
}
bootstrap();
