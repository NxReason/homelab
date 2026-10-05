import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { MealToFood } from './mealToFood.entity';

@Entity()
export class Meal {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @OneToMany(() => MealToFood, (mealToFood) => mealToFood.meal, {
    cascade: true,
    orphanedRowAction: 'delete',
  })
  ingredients!: MealToFood[];
}
