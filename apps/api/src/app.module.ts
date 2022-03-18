import 'dotenv/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// our libraries
import { ProductsModule } from './routes/store/products/products.module';
import { CartItemsModule } from './routes/store/cart-items/cart-items.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './routes/store/products/entities/products.entity';
import { Image } from './routes/store/products/entities/images.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DB,
      entities: [Product, Image],
      synchronize: true,
    }),
    ProductsModule,
    CartItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
