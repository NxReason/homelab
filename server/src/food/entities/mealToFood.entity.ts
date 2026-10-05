import { Column, Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Meal } from './meal.entity';
import { Food } from './food.entity';

@Entity()
export class MealToFood {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  foodId!: number;

  @Column()
  mealId!: number;

  @Column()
  grams!: number;

  @ManyToOne(() => Food, (food) => food.inMeals)
  food!: Food;

  @ManyToOne(() => Meal, (meal) => meal.ingredients)
  meal!: Meal;
}
