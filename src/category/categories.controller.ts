import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto, UpdateCategoryDto } from './dto/category.dto';
import { Public } from '../users/decorators/public.decorator';
import { CheckPolicies } from '../users/decorators/check-policies.decorator';
import { AbilityFactory, Action } from 'src/abilities/abilities.factory';

@Controller('category')
export class CategorysController {
  constructor(
    private readonly categoriesService: CategoriesService,
    private abilityFactory: AbilityFactory,
  ) {}

  @Public()
  @Get()
  findAll() {
    return this.categoriesService.findAll();
  }

  @Public()
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.categoriesService.findById(id);
  }

  @CheckPolicies({ action: Action.Create, subject: 'Category' })
  @Post()
  create(@Body() createCategoryDto: CreateCategoryDto, @Request() req) {
    return this.categoriesService.create(createCategoryDto, req.user.id);
  }

  @CheckPolicies({ action: Action.Update, subject: 'Category', checkData: true })
  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
    @Request() req,
  ) {
    const category = await this.categoriesService.findById(id);
    const ability = this.abilityFactory.defineAbilitiesFor(req.user);
    
    // Manual check for entity-specific permissions
    if (!this.abilityFactory.can(ability, Action.Update, 'Category', category)) {
      throw new ForbiddenException('You can only update your own category');
    }
    
    return this.categoriesService.update(id, updateCategoryDto);
  }

  @CheckPolicies({ action: Action.Delete, subject: 'Category', checkData: true })
  @Delete(':id')
  async delete(@Param('id') id: string, @Request() req) {
    const category = await this.categoriesService.findById(id);
    const ability = this.abilityFactory.defineAbilitiesFor(req.user);
    
    // Manual check for entity-specific permissions
    if (!this.abilityFactory.can(ability, Action.Delete, 'Category', category)) {
      throw new ForbiddenException('You can only delete your own category');
    }
    
    return this.categoriesService.delete(id);
  }
  
  // Admin-only route example
  @CheckPolicies({ action: Action.Manage, subject: 'Category' })
  @Get('admin/all')
  findAllAdmin() {
    return this.categoriesService.findAll();
  }
}

// 7. Entity example for reference
// src/users/entities/user.entity.ts
export class User {
  id: string;
  username: string;
  email: string;
  password: string;
  role: string;
}