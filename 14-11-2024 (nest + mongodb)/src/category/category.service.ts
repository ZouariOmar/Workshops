import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Category } from './entities/category.entity';
import { Model } from 'mongoose';

@Injectable()
export class CategoryService {
  constructor(
    @InjectModel(Category.name) private categoryModel: Model<Category>,
  ) {}
      // Create a new category
  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const newCategory = new this.categoryModel(createCategoryDto);
    return newCategory.save();
  }

  // Get all categories
  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  // Get a single category by ID
  async findOne(id: string): Promise<Category> {
    const category = await this.categoryModel.findById(id).exec();
    if (!category) throw new NotFoundException(`Category with ID ${id} not found`);
    return category;
  }

  // Update a category by ID
  async update(id: string, updateCategoryDto: UpdateCategoryDto): Promise<Category> {
    const updatedCategory = await this.categoryModel
      .findByIdAndUpdate(id, updateCategoryDto, { new: true })
      .exec();
    if (!updatedCategory) throw new NotFoundException(`Category with ID ${id} not found`);
    return updatedCategory;
  }

  // Delete a category by ID
  async remove(id: string): Promise<Category> {
    const deletedCategory = await this.categoryModel.findByIdAndDelete(id).exec();
    if (!deletedCategory) throw new NotFoundException(`Category with ID ${id} not found`);
    return deletedCategory;
  }
}
