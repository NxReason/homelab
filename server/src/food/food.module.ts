import { Module } from '@nestjs/common';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Food } from './entities/food.entity';
import { Micronutrient } from './entities/micronutrient.entity';
import { MicroToFood } from './entities/microToFood.entity';
import { Meal } from './entities/meal.entity';
import { MealToFood } from './entities/mealToFood.entity';

import { MealService } from './meal.service';
import { MealController } from './meal.controller';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Food,
      Micronutrient,
      MicroToFood,
      Meal,
      MealToFood,
    ]),
  ],
  providers: [FoodService, MealService],
  controllers: [FoodController, MealController],
})
export class FoodModule {}
