export class CreateFoodDto {
  name!: string;
  calorieCount!: number;
}

export class UpdateFoodDto {
  id!: number;
  name!: string;
  calorieCount!: number;
}
