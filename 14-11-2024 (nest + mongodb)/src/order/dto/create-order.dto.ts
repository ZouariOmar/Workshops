// create-order.dto.ts
import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { CreateOrderItemDto } from 'src/order-item/dto/create-order-item.dto';
import { OrderItem } from 'src/order-item/entities/order-item.entity';

export class CreateOrderDto {
  @IsArray()
  items: CreateOrderItemDto[];
  @IsString()
  @IsNotEmpty()
  status: string;
  totalPrice?: number;
}
