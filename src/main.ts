// const dotenv = require('dotenv');
// import dotenv from 'dotenv'  

require('dotenv').config();
import "reflect-metadata";

import { NestFactory } from '@nestjs/core';

import { AppModule } from './app.module';

import { Logger } from '@nestjs/common';

// dotenv.config();
const port = process.env.PORT || 8080;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  Logger.log(`Server listening on http://localhost:${port}`, 'Bootstrap');
}
bootstrap();
