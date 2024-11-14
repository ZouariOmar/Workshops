import { Module } from '@nestjs/common';
import { OrderItemService } from './order-item.service';
import { OrderItemController } from './order-item.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrderItem, OrderItemSchema } from './entities/order-item.entity';
import { ProductService } from 'src/product/product.service';
import { ProductModule } from 'src/product/product.module';
import { Product, ProductSchema } from 'src/product/entities/product.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([
      { name: OrderItem.name, schema: OrderItemSchema },
    ]),
  ],
  controllers: [OrderItemController],
  providers: [OrderItemService, ProductService],
})
export class OrderItemModule {}
