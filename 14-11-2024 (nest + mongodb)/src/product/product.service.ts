import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { promises } from 'readline';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  // Create a new product
  async create(createProductDto: CreateProductDto): Promise<Product> {
    const newProduct = new this.productModel(createProductDto);
    return newProduct.save();
  }

  // Get all products
  async findAll(): Promise<Product[]> {
    return this.productModel.find().populate('categoryId').exec();
  }

  // Get a single product by ID
  async findOne(id: string): Promise<Product> {
    const product = await this.productModel
      .findById(id)
      .populate('categoryId')
      .exec();
    if (!product)
      throw new NotFoundException(`Product with ID ${id} not found`);
    return product;
  }

  // Update a product by ID
  async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .populate('categoryId')
      .exec();
    if (!updatedProduct)
      throw new NotFoundException(`Product with ID ${id} not found`);
    return updatedProduct;
  }

  // Delete a product by ID
  async remove(id: string): Promise<Product> {
    const deletedProduct = await this.productModel.findByIdAndDelete(id).exec();
    if (!deletedProduct)
      throw new NotFoundException(`Product with ID ${id} not found`);
    return deletedProduct;
  }
  async updateStock(productId: string, quantity: number): Promise<Product> {
    let product = await this.productModel.findById(productId);
    return this.update(productId, { stock: product.stock + quantity });
  }
}
