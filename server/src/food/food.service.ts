import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Food } from './entities/food.entity';
import { Repository } from 'typeorm';
import { ResponseFoodDto, CreateFoodDto, UpdateFoodDto } from './food.dto';
import { mapFoodDbToResponse } from './helpers';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food)
    private foodRepo: Repository<Food>,
  ) {}

  async readAll(): Promise<ResponseFoodDto[]> {
    const foodsDb = await this.foodRepo.find({
      relations: {
        micros: {
          micro: true,
        },
      },
      order: {
        name: 'DESC',
      },
    });
    const foods = foodsDb.map(mapFoodDbToResponse);

    return foods;
  }

  async readOne(id: number): Promise<ResponseFoodDto | null> {
    const foodDb = await this.foodRepo.findOneBy({ id });
    if (!foodDb) return null;
    return mapFoodDbToResponse(foodDb);
  }

  create(dto: CreateFoodDto): Promise<Food> {
    return this.foodRepo.save(dto);
  }

  async update(dto: UpdateFoodDto): Promise<Food | null> {
    const food = await this.foodRepo.preload(dto);
    if (!food) {
      return null;
    }
    return this.foodRepo.save(food);
  }

  async delete(id: number): Promise<Food | null> {
    const delFood = await this.foodRepo.findOneBy({ id });

    if (!delFood) return null;

    return this.foodRepo.remove(delFood);
  }
}
