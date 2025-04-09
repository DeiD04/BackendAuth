import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './schema/product.schema';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { AbilitiesModule } from '../abilities/abilities.module';
import { Category, CategorySchema } from 'src/category/schema/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }, { name: Category.name, schema: CategorySchema }]),
    AbilitiesModule,
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule { }
