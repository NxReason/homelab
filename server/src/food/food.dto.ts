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

class ResponseMicroDto {
  id!: number;
  name!: string;
  amount!: number;
}

export class ResponseFoodDto {
  id!: number;
  name!: string;
  calories!: number;

  protein: number = 0;
  carbs: number = 0;
  fat: number = 0;
  saturatedFat: number = 0;
  fiber: number = 0;

  micros!: ResponseMicroDto[];
}
