import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './products.controller';
import { FirestoreModule } from '../../services/database/firestore/firestore.module';
import { Product } from './entities/product.entity';

@Module({
  imports: [FirestoreModule.forFeature(Product)],
  controllers: [ProductsController],
  providers: [ProductsService],
})
export class ProductsModule {}
