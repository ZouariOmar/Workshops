import { Module } from '@nestjs/common';
import { OrderService } from './order.service';
import { OrderController } from './order.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './entities/order.entity';
import { OrderItemService } from 'src/order-item/order-item.service';
import { ProductService } from 'src/product/product.service';
import { OrderItem, OrderItemSchema } from 'src/order-item/entities/order-item.entity';
import { Product, ProductSchema } from 'src/product/entities/product.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: OrderItem.name, schema: OrderItemSchema }]),
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
  ],
  controllers: [OrderController],
  providers: [OrderService, OrderItemService, ProductService],
})
export class OrderModule {}
