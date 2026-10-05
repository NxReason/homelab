import { Module } from '@nestjs/common';
import { FoodController } from './food.controller';
import { FoodService } from './food.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Food } from './entities/food.entity';
import { Micronutrient } from './entities/micronutrient.entity';
import { MicroToFood } from './entities/microToFood.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Food, Micronutrient, MicroToFood])],
  providers: [FoodService],
  controllers: [FoodController],
})
export class FoodModule {}
