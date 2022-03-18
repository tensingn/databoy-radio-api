import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// our libraries
import { ProductsModule } from './store/products/products.module';
import { CartItemsModule } from './store/cart-items/cart-items.module';
import { DataModule } from '@app/data';

@Module({
  imports: [ProductsModule, CartItemsModule, DataModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
