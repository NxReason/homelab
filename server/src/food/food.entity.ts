import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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
}
