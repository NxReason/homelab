import type { PalleteColor } from './pallete.entity';

export class CreatePalleteDto {
  name!: string;
  colors!: PalleteColor[];
}

export class UpdatePalleteDto {
  id!: number;
  name!: string;
  colors!: PalleteColor[];
}
