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
import { Food } from './entities/food.entity';
import { CreateFoodDto, ResponseFoodDto, UpdateFoodDto } from './food.dto';

@Controller('api/food')
export class FoodController {
  constructor(private foodService: FoodService) {}

  @Get()
  async readAll(): Promise<ResponseFoodDto[]> {
    const foods = await this.foodService.readAll();
    foods.forEach((f) => console.log(f.micros));
    return foods;
  }

  @Get(':id')
  async readOne(@Param('id') id: number): Promise<ResponseFoodDto> {
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
