import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderItemDto } from './dto/create-order-item.dto';
import { UpdateOrderItemDto } from './dto/update-order-item.dto';
import { OrderItem } from './entities/order-item.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class OrderItemService {
  constructor(@InjectModel(OrderItem.name) private orderItemModel: Model<OrderItem>) {}

  // Create a new order item
  async create(createOrderItemDto: CreateOrderItemDto): Promise<OrderItem> {
    const newOrderItem = new this.orderItemModel(createOrderItemDto);
    return newOrderItem.save();
  }

  // Get all order items
  async findAll(): Promise<OrderItem[]> {
    return this.orderItemModel.find().populate('productId').exec();
  }

  // Get a single order item by ID
  async findOne(id: string): Promise<any> {
    console.log(id)

    const orderItem = await this.orderItemModel.findById(id).populate('productId').exec();
    console.log(orderItem)

    if (!orderItem) throw new NotFoundException(`OrderItem with ID ${id} not found`);
    return orderItem;
  }

  // Update an order item by ID
  async update(id: string, updateOrderItemDto: UpdateOrderItemDto): Promise<OrderItem> {
    const updatedOrderItem = await this.orderItemModel
      .findByIdAndUpdate(id, updateOrderItemDto, { new: true })
      .populate('productId')
      .exec();
    if (!updatedOrderItem) throw new NotFoundException(`OrderItem with ID ${id} not found`);
    return updatedOrderItem;
  }

  // Delete an order item by ID
  async remove(id: string): Promise<OrderItem> {
    const deletedOrderItem = await this.orderItemModel.findByIdAndDelete(id).exec();
    if (!deletedOrderItem) throw new NotFoundException(`OrderItem with ID ${id} not found`);
    return deletedOrderItem;
  }
}