require('dotenv').config();
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { Module } from '@nestjs/common';
import { DataService } from './data.service';

@Module({
  imports: [
    MikroOrmModule.forRoot({
      entities: ['./dist/entities'],
      entitiesTs: ['./src/entities'],
      dbName: process.env.DB_DB,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      type: 'mysql',
    }),
  ],
  providers: [DataService],
  exports: [DataService],
})
export class DataModule {}
