import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Food } from './entities/food.entity';
import { In, Repository } from 'typeorm';
import {
  ResponseFoodDto,
  CreateFoodDto,
  UpdateFoodDto,
  MicroDto,
} from './food.dto';
import { mapFoodDbToResponse } from './helpers';
import { Micronutrient } from './entities/micronutrient.entity';
import { MicroToFood } from './entities/microToFood.entity';

@Injectable()
export class FoodService {
  constructor(
    @InjectRepository(Food)
    private foodRepo: Repository<Food>,
    @InjectRepository(Micronutrient)
    private microRepo: Repository<Micronutrient>,
    @InjectRepository(MicroToFood)
    private mtfRepo: Repository<MicroToFood>,
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

  async create(dto: CreateFoodDto): Promise<ResponseFoodDto> {
    const { micros, ...foodData } = dto;
    const food = this.foodRepo.create(foodData);
    await this.setMicrosToFood(food, micros);
    await this.foodRepo.save(food);
    return mapFoodDbToResponse(food);
  }

  async update(dto: UpdateFoodDto): Promise<ResponseFoodDto | null> {
    const { micros, ...foodData } = dto;
    const food = await this.foodRepo.preload(foodData);
    if (!food) {
      return null;
    }
    await this.setMicrosToFood(food, micros);
    await this.foodRepo.save(food);
    return mapFoodDbToResponse(food);
  }

  async setMicrosToFood(food: Food, micros: MicroDto[]) {
    const existingDb = await this.microRepo.find({
      where: {
        name: In(micros.map((m) => m.name)),
      },
    });
    const existingNames = new Set(existingDb.map((m) => m.name));

    // create new micros
    const missing = micros
      .filter((m) => !existingNames.has(m.name))
      .map((m) => this.microRepo.create({ name: m.name }));
    const missingDb = await this.microRepo.save(missing);

    // prepare for join table
    const allMicros = [...existingDb, ...missingDb];
    const amounts = new Map(micros.map((m) => [m.name, m.amount]));

    // create new food entity
    food.micros = allMicros.map((micro) => {
      const rel = new MicroToFood();
      rel.micro = micro;
      rel.amount = amounts.get(micro.name)!;
      return rel;
    });
  }

  async delete(id: number): Promise<Food | null> {
    const food = await this.foodRepo.findOneBy({ id });

    if (!food) return null;
    await this.mtfRepo.delete({
      foodId: food.id,
    });

    return this.foodRepo.remove(food);
  }
}
