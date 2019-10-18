import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { IdeaController } from './idea/idea.controller';
import { IdeaModule } from './idea/idea.module';

import { Connection } from 'typeorm';
import {APP_FILTER, APP_INTERCEPTOR} from '@nestjs/core';
import { HttpErrorFilter } from './shared/http-error.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';
import { UserModule } from './user/user.module';

@Module({
  imports: [TypeOrmModule.forRoot(), IdeaModule, UserModule],
  controllers: [AppController, IdeaController],
  providers: [
    AppService, 
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor
    }
  ],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}


//   "entities": ["./src/**/*.entity.ts", "./dist/**/*.entity.js"]

