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
    const updFood = await this.foodRepo.findOneBy({ id: dto.id });

    if (!updFood) return null;

    updFood.name = dto.name;
    updFood.calorieCount = dto.calorieCount;

    return this.foodRepo.save(updFood);
  }

  async delete(id: number): Promise<Food | null> {
    const delFood = await this.foodRepo.findOneBy({ id });

    if (!delFood) return null;

    return this.foodRepo.remove(delFood);
  }
}
