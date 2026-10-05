import {
  Body,
  Controller,
  Get,
  Post,
  NotFoundException,
  Param,
} from '@nestjs/common';
import { MealService } from './meal.service';
import { Meal } from './entities/meal.entity';
import { CreateMealDto } from './meal.dto';

@Controller('api/meals')
export class MealController {
  constructor(private mealService: MealService) {}

  @Get()
  readAll(): Promise<Meal[]> {
    return this.mealService.readAll();
  }

  @Get('/:id')
  async readOne(@Param('id') id: number): Promise<Meal> {
    const meal = await this.mealService.readOne(id);
    if (!meal) {
      throw new NotFoundException(`Can't find meal with id ${id}`);
    }
    return meal;
  }

  @Post()
  async create(@Body() dto: CreateMealDto): Promise<Meal> {
    return this.mealService.create(dto);
  }
}
