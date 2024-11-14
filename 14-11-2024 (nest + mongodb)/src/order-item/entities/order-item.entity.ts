import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document, ObjectId } from 'mongoose';
import { Category } from 'src/category/entities/category.entity';
import { Product } from 'src/product/entities/product.entity';
@Schema()
export class OrderItem extends Document {
  @Prop({ Type: mongoose.Schema.Types.ObjectId, ref: Product.name })
  productId: string;
  @Prop({ required: true })
  quantity: number;
}
export const OrderItemSchema = SchemaFactory.createForClass(OrderItem);
