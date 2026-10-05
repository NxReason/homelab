class Ingredient {
  foodId!: number;
  grams: number = 0;
}

export class CreateMealDto {
  name!: string;
  ingredients: Ingredient[] = [];
}
