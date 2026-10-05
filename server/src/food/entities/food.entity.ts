import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { MicroToFood } from './microToFood.entity';

@Entity()
export class Food {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  name!: string;

  @Column()
  calories!: number;

  @Column({ default: 0 })
  protein!: number;

  @Column({ default: 0 })
  carbs!: number;

  @Column({ default: 0 })
  fat!: number;

  @Column({ default: 0 })
  saturatedFat!: number;

  @Column({ default: 0 })
  fiber!: number;

  @OneToMany(() => MicroToFood, (microToFood) => microToFood.food)
  micros!: MicroToFood[];
}
