import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TypeOrmModule } from '@nestjs/typeorm';
import { IdeaController } from './idea/idea.controller';
import { IdeaModule } from './idea/idea.module';

import { Connection } from 'typeorm';

@Module({
  imports: [TypeOrmModule.forRoot(), IdeaModule],
  controllers: [AppController, IdeaController],
  providers: [AppService],
})
export class AppModule {
  constructor(private readonly connection: Connection) {}
}


//   "entities": ["./src/**/*.entity.ts", "./dist/**/*.entity.js"]

