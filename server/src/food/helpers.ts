import { Food } from './entities/food.entity';
import { ResponseFoodDto } from './food.dto';

export function mapFoodDbToResponse(food: Food): ResponseFoodDto {
  return {
    ...food,
    micros: food.micros.map(({ micro, amount }) => ({
      id: micro.id,
      name: micro.name,
      amount,
    })),
  };
}
