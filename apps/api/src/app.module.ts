import 'dotenv/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// 3rd party modules
import { TypeOrmModule } from '@nestjs/typeorm';

// our modules
import { ProductsModule } from './routes/store/products/products.module';
import { CartItemsModule } from './routes/store/cart-items/cart-items.module';

// entities
import { Product } from './routes/store/products/entities/product.entity';
import { Image } from './routes/store/products/entities/image.entity';
import { Size } from './routes/store/products/entities/size.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DB,
      entities: [Product, Image, Size],
      synchronize: true,
    }),
    ProductsModule,
    CartItemsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
