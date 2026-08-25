import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

export interface PalleteColor {
  id: string;
  name: string;
  hex: string;
}

@Entity()
export class Pallete {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column({
    type: 'jsonb',
    default: () => "'[]'",
  })
  colors!: PalleteColor[];

  @CreateDateColumn()
  createdAt!: Date;
}
