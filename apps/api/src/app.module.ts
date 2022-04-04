import 'dotenv/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// 3rd party modules
import { TypeOrmModule } from '@nestjs/typeorm';

// our modules
import { ProductsModule } from './routes/products/products.module';
import { CartItemsModule } from './routes/cart-items/cart-items.module';
import { DateEventsModule } from './routes/date-events/date-events.module';
import { MixesModule } from './routes/mixes/mixes.module';
import { ReleasesModule } from './routes/releases/releases.module';
import { CalendarEventsModule } from './routes/calendar-events/calendar-events.module';

// entities
import { Product } from './routes/products/entities/product.entity';
import { Image } from './routes/products/entities/image.entity';
import { Size } from './routes/products/entities/size.entity';
import { CartItem } from './routes/cart-items/entities/cart-item.entity';
import { Mix } from './routes/mixes/entities/mix.entity';
import { Release } from './routes/releases/entities/release.entity';
import { CalendarEvent } from './routes/calendar-events/entities/calendar-event.entity';
import { CalendarEventType } from './routes/calendar-events/entities/calendar-event-type.entity';
import { DateEvent } from './routes/date-events/entities/date-event.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DB,
      entities: [
        Product,
        Image,
        Size,
        CartItem,
        Mix,
        Release,
        CalendarEvent,
        CalendarEventType,
        DateEvent,
      ],
      synchronize: true,
    }),
    ProductsModule,
    CartItemsModule,
    MixesModule,
    ReleasesModule,
    CalendarEventsModule,
    DateEventsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
