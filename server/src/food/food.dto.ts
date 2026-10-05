export class CreateFoodDto {
  name!: string;
  calories!: number;

  protein: number = 0;
  carbs: number = 0;
  fat: number = 0;
  saturatedFat: number = 0;
  fiber: number = 0;
}

export class UpdateFoodDto {
  id!: number;
  name!: string;
  calories!: number;

  protein: number = 0;
  carbs: number = 0;
  fat: number = 0;
  saturatedFat: number = 0;
  fiber: number = 0;
}
