import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { auth } from './lib/auth';
import { toNodeHandler } from 'better-auth/node';
import cookieParser from 'cookie-parser'

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false,
  });

  app.use('/api/auth/*', toNodeHandler(auth));

  app.use(cookieParser());

  app.enableCors({
    origin: [process.env.BETTER_AUTH_URL!,
      "http://localhost:3001",
      "http://localhost:5173"
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
		allowedHeaders: ['Content-Type', 'Authorization'],
  })
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
