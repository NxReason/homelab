export class MenuItem {
  public path: string;
  public name: string;
  public isActive: boolean;
  public subItems: MenuItem[];

  constructor(
    path: string,
    name: string = '',
    isActive: boolean | string = false,
    subItems: MenuItem[] = [],
  ) {
    this.path = path;
    this.name = name;
    this.isActive = typeof isActive === 'string' ? isActive === path : isActive;
    this.subItems = subItems;
  }

  public hasSubs(): boolean {
    return this.subItems.length > 0;
  }
}
