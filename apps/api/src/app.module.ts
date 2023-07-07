import 'dotenv/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// 3rd party modules
import { TypeOrmModule } from '@nestjs/typeorm';

// our modules
import { ProductsModule } from './routes/products/products.module';
import { CartItemsModule } from './routes/cart-items/cart-items.module';
import { MixesModule } from './routes/mixes/mixes.module';
import { ReleasesModule } from './routes/releases/releases.module';
import { CalendarEventsModule } from './routes/calendar-events/calendar-events.module';
import { SubscribersModule } from './routes/subscribers/subscribers.module';

// entities
import { Product } from './routes/products/entities/product.entity';
import { Image } from './routes/products/entities/image.entity';
import { Size } from './routes/products/entities/size.entity';
import { CartItem } from './routes/cart-items/entities/cart-item.entity';
import { Mix } from './routes/mixes/entities/mix.entity';
import { Release } from './routes/releases/entities/release.entity';
import { CalendarEvent } from './routes/calendar-events/entities/calendar-event.entity';
import { CalendarEventType } from './routes/calendar-events/entities/calendar-event-type.entity';
import { MixLike } from './routes/mixes/entities/mix-like.entity';
import { ReleaseLike } from './routes/releases/entities/release-like.entity';
import { Subscriber } from './routes/subscribers/entities/subscriber.entity';
import { AuthorizationModule } from './authorization/authorization.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      supportBigNumbers: true,
      bigNumberStrings: false,
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
        MixLike,
        ReleaseLike,
        Subscriber,
      ],
      synchronize: true,
    }),
    ProductsModule,
    CartItemsModule,
    MixesModule,
    ReleasesModule,
    CalendarEventsModule,
    SubscribersModule,
    AuthorizationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
