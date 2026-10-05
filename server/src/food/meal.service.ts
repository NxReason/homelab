import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Meal } from './entities/meal.entity';
import { Repository } from 'typeorm';
import { CreateMealDto } from './meal.dto';
import { MealToFood } from './entities/mealToFood.entity';

@Injectable()
export class MealService {
  constructor(
    @InjectRepository(Meal)
    private mealRepo: Repository<Meal>,
    @InjectRepository(MealToFood)
    private mtfRepo: Repository<MealToFood>,
  ) {}

  readAll() {
    return this.mealRepo.find({
      relations: {
        ingredients: true,
      },
    });
  }

  async readOne(id: number): Promise<Meal | null> {
    const meal = await this.mealRepo.findOneBy({ id });
    return meal;
  }

  async create(dto: CreateMealDto): Promise<Meal> {
    const meal = await this.mealRepo.save(
      this.mealRepo.create({ name: dto.name }),
    );
    const ingredients = dto.ingredients.map((i) => {
      return this.mtfRepo.create({
        food: { id: i.foodId },
        grams: i.grams,
        meal,
      });
    });

    await this.mtfRepo.save(ingredients);
    return meal;
  }
}
