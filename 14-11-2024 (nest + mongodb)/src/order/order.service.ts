import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Order } from './entities/order.entity';
import { Model } from 'mongoose';
import { OrderItemService } from 'src/order-item/order-item.service';
import { ProductService } from 'src/product/product.service';

@Injectable()
export class OrderService {
  constructor(
    private readonly orderItemService: OrderItemService,
    private readonly productService: ProductService,
    @InjectModel(Order.name) private orderModel: Model<Order>,
  ) {}

  // Create a new order
  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    let totalPrice = 0;
    const orderItemsIds = await Promise.all(
      createOrderDto.items.map(async (item) => {
        const product = await this.productService.updateStock(
          item.productId,
          -item.quantity,
        );
        totalPrice += item.quantity * product.price;
        return this.orderItemService.create(item);
      }),
    );

    // Add totalPrice to createOrderDto
    createOrderDto.totalPrice = totalPrice;
    createOrderDto.items = orderItemsIds;

    const newOrder = new this.orderModel(createOrderDto);
    return newOrder.save();
  }

  // Get all orders
  async findAll(): Promise<Order[]> {
    return this.orderModel.find().populate('items').exec();
  }

  // Get a single order by ID
  async findOne(id: string): Promise<Order> {
    const order = await this.orderModel.findById(id).populate('items').exec();
    if (!order) throw new NotFoundException(`Order with ID ${id} not found`);
    return order;
  }

  // Update an order by ID
  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<Order> {
    const updatedOrder = await this.orderModel
      .findByIdAndUpdate(id, updateOrderDto, { new: true })
      .populate('items')
      .exec();
    if (!updatedOrder)
      throw new NotFoundException(`Order with ID ${id} not found`);
    return updatedOrder;
  }

  // Delete an order by ID
  async remove(id: string): Promise<Order> {
    const deletedOrder = await this.orderModel.findByIdAndDelete(id).exec();
    if (!deletedOrder)
      throw new NotFoundException(`Order with ID ${id} not found`);
    return deletedOrder;
  }
}
