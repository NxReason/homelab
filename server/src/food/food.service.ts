import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Food } from './food.entity';
import { Repository } from 'typeorm';
import { CreateFoodDto, UpdateFoodDto } from './food.dto';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food)
    private foodRepo: Repository<Food>,
  ) {}

  readAll(): Promise<Food[]> {
    return this.foodRepo.find({
      order: {
        name: 'DESC',
      },
    });
  }

  readOne(id: number): Promise<Food | null> {
    return this.foodRepo.findOneBy({ id });
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
