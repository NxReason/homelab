import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

interface PalleteColor {
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
}
