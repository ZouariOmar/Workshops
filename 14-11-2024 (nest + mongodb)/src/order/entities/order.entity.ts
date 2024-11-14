import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { OrderItem } from 'src/order-item/entities/order-item.entity';

@Schema()
export class Order extends Document {
  @Prop({ type: [{ type: mongoose.Schema.Types.ObjectId, ref: OrderItem.name }] })
  items: OrderItem[];
  @Prop({ required: true })
  totalPrice: number;
  @Prop({ required: true })
  status: string;
}
export const OrderSchema = SchemaFactory.createForClass(Order);
