import {
  Body,
  Controller,
  Get,
  Post,
  Put,
  Delete,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { FoodService } from './food.service';
import { Food } from './food.entity';
import { CreateFoodDto, UpdateFoodDto } from './food.dto';

@Controller('api/food')
export class FoodController {
  constructor(private foodService: FoodService) {}

  @Get()
  readAll(): Promise<Food[]> {
    console.log('reached');
    return this.foodService.readAll();
  }

  @Get(':id')
  async readOne(@Param('id') id: number): Promise<Food> {
    const food = await this.foodService.readOne(id);

    if (!food) {
      throw new NotFoundException('Food not found');
    }

    return food;
  }

  @Post()
  async create(@Body() dto: CreateFoodDto): Promise<Food> {
    return this.foodService.create(dto);
  }

  @Put(':id')
  async update(@Body() dto: UpdateFoodDto): Promise<Food> {
    const updFood = await this.foodService.update(dto);

    if (!updFood) {
      throw new NotFoundException('Food not found');
    }

    return updFood;
  }

  @Delete(':id')
  async delete(@Param('id') id: number): Promise<Food> {
    const delFood = await this.foodService.delete(id);

    if (!delFood) {
      throw new NotFoundException('Food not found');
    }

    return delFood;
  }
}
