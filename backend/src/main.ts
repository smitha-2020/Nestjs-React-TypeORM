import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as path from 'path';
import * as express from 'express';

declare const module: any;
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe({ transform: true }));

  app.use(
    '/photos',
    express.static(path.join(__dirname, '..', 'uploads/Images')),
  );

  //console.log(__dirname);
  app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3001');
    next();
  });
  app.enableCors({
    origin: 'http://localhost:3001',
    credentials: true,
    methods: 'GET,PUT,POST,DELETE,UPDATE,OPTIONS',
  });
  await app.listen(3000);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }
}
bootstrap().then();
