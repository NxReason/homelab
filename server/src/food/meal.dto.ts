class Ingredient {
  foodId!: number;
  grams: number = 0;
}

export class CreateMealDto {
  name!: string;
  ingredients: Ingredient[] = [];
}

export class UpdateMealDto {
  id!: number;
  name!: string;
  ingredients: Ingredient[] = [];
}
