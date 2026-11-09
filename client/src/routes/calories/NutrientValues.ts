import type { IFood, IMicro } from './IFood';

export class NutrientValues {
  calories: number = 0;

  protein: number = 0;
  carbs: number = 0;
  fat: number = 0;
  saturatedFat: number = 0;
  fiber: number = 0;

  micros: IMicro[] = [];

  init(food: IFood, grams: number) {
    const mult = grams / 100;

    this.calories = food.calories * mult;

    this.protein = food.protein * mult;
    this.carbs = food.carbs * mult;
    this.fat = food.fat * mult;
    this.saturatedFat = food.saturatedFat * mult;
    this.fiber = food.fiber * mult;

    this.micros = food.micros.map(m => ({
      name: m.name,
      amount: m.amount * mult,
    }));
  }

  add(other: NutrientValues) {
    this.calories += other.calories;

    this.protein += other.protein;
    this.carbs += other.carbs;
    this.fat += other.fat;
    this.saturatedFat += other.saturatedFat;
    this.fiber += other.fiber;

    this.addMicros(other);
  }

  addMicros(other: NutrientValues) {
    other.micros.forEach(om => {
      const thisIndex = this.micros.findIndex(m => m.name === om.name);
      if (thisIndex === -1) {
        this.micros.push(om);
      } else {
        this.micros[thisIndex].amount += om.amount;
      }
    });
  }

  static combine(left: NutrientValues, right: NutrientValues): NutrientValues {
    const total = new NutrientValues();

    total.add(left);
    total.add(right);

    return total;
  }
}
