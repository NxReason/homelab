export interface IMicro {
  id?: number;
  name: string;
  amount: number;
}

export interface IFood {
  id?: number;
  name: string;
  calories: number;

  protein: number;
  carbs: number;
  fat: number;
  saturatedFat: number;
  fiber: number;

  micros: IMicro[];
}
