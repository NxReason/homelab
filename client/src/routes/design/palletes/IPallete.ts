export interface IPalleteColor {
  id: string;
  name: string;
  hex: string;
}

export interface IPallete {
  id?: number;
  name: string;
  colors: IPalleteColor[];
}
