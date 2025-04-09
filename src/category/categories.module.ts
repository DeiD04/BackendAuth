import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from './schema/category.schema';
import { CategorysController } from './categories.controller';
import { CategoriesService } from './categories.service';
import { AbilitiesModule } from '../abilities/abilities.module';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
          dest: './uploads'
        }),
    MongooseModule.forFeature([{ name: Category.name, schema: CategorySchema }]),
    AbilitiesModule,
  ],
  controllers: [CategorysController],
  providers: [CategoriesService],
  exports: [CategoriesService],
})
export class CategoriesModule {}
