// products/products.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './schema/product.schema';
import { CreateProductDto, UpdateProductDto } from './dto/product.dto';
import { Category, CategoryDocument } from 'src/category/schema/category.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<ProductDocument>,
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>,

  ) { }

  async findAll(userId?: string): Promise<Product[]> {
    const query = userId ? { createdBy: userId } : {};
    return this.productModel.find(query).exec();
  }

  async findById(id: string): Promise<Product> {
    const product = await this.productModel.findById(id).exec();
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  async create(createProductDto: CreateProductDto, userId: string): Promise<Product> {

    if (createProductDto.category) {
      const categoryFinded = await this.categoryModel.findById(createProductDto.category);
      if (categoryFinded) {
        throw new NotFoundException(`Cateogy id ${createProductDto.category} not found`);
      }
    }
    const newProduct = new this.productModel({
      ...createProductDto,
      createdBy: userId,
    });
    return newProduct.save();
  }

  async update(id: string, updateProductDto: UpdateProductDto): Promise<Product> {
    const updatedProduct = await this.productModel
      .findByIdAndUpdate(id, updateProductDto, { new: true })
      .exec();
    if (!updatedProduct) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    if (updateProductDto.category) {
      const categoryFinded = await this.categoryModel.findById(updateProductDto.category);
      if (categoryFinded) {
        throw new NotFoundException(`Cateogy id ${updateProductDto.category} not found`);
      }
    }
    return updatedProduct;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.productModel.findByIdAndDelete(id).exec();
    if (!result) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return true;
  }
}