import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// our libraries
import { ProductsModule } from './store/products/products.module';
import { CartItemsModule } from './store/cart-items/cart-items.module';

@Module({
  imports: [ProductsModule, CartItemsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
