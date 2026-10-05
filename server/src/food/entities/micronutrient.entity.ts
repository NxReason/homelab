import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { MicroToFood } from './microToFood.entity';

@Entity()
export class Micronutrient {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true, nullable: false })
  name!: string;

  @OneToMany(() => MicroToFood, (microToFood) => microToFood.micro)
  inFoods!: MicroToFood[];
}
