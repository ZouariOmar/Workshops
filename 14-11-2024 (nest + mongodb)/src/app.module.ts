import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductModule } from './product/product.module';
import { OrderModule } from './order/order.module';
import { OrderItemModule } from './order-item/order-item.module';
import { CategoryModule } from './category/category.module';
import { MongooseModule } from '@nestjs/mongoose';
import { LoggerMiddleware } from './logger/logger.middleware';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/examen'),
    ProductModule,
    OrderModule,
    OrderItemModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(LoggerMiddleware) // Applique le middleware
      .forRoutes('*'); // Applique à toutes les routes
  }
}
