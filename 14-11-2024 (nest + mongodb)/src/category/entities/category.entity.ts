import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Category {
  @Prop({ required: true })
  name: string;
}
export const CategorySchema = SchemaFactory.createForClass(Category);
