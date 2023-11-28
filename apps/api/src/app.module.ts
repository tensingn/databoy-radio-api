import 'dotenv/config';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

// our modules
import { ProductsModule } from './routes/products/products.module';
import { CartItemsModule } from './routes/cart-items/cart-items.module';
import { TracksModule } from './routes/tracks/tracks.module';
import { CalendarEventsModule } from './routes/calendar-events/calendar-events.module';
import { SubscribersModule } from './routes/subscribers/subscribers.module';

// entities
import { AuthorizationModule } from './authorization/authorization.module';
import { UsersModule } from './routes/users/users.module';
import { FirestoreModule } from './services/database/firestore/firestore.module';
import { ReleasesModule } from './routes/releases/releases.module';

@Module({
  imports: [
    ProductsModule,
    CartItemsModule,
    TracksModule,
    CalendarEventsModule,
    SubscribersModule,
    AuthorizationModule,
    UsersModule,
    ReleasesModule,
    FirestoreModule.forRoot({
      projectId: process.env.GCP_PROJECTID,
      keyFilename: process.env.GCP_KEYFILENAME,
      ignoreUndefinedProperties: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
