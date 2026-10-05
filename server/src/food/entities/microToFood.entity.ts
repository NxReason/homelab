import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Food } from './food.entity';
import { Micronutrient } from './micronutrient.entity';

@Entity()
export class MicroToFood {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  foodId!: number;

  @Column()
  microId!: number;

  @Column({ default: 0 })
  amount!: number;

  @ManyToOne(() => Food, (food) => food.micros)
  food!: Food;

  @ManyToOne(() => Micronutrient, (micro) => micro.inFoods)
  micro!: Micronutrient;
}
