import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Category } from 'src/category/entities/category.entity';
@Schema()
export class Product {
  @Prop({ required: true })
  name: string;
  @Prop({ required: true })
  description: string;
  @Prop({ required: true })
  price: number;
  @Prop({ required: true })
  stock: number;
  @Prop({ Type: mongoose.Schema.Types.ObjectId, ref: Category.name })
  categoryId: string;
}
export const ProductSchema = SchemaFactory.createForClass(Product);
