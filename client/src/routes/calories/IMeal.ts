export type MealGrams = {
  foodId: number;
  grams: number;
};

export interface IMeal {
  id?: number;
  name: string;
  ingredients: MealGrams[];
}
