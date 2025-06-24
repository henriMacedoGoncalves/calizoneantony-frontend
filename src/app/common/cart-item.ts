export class CartItem {
  id!: number;
  title!: string;
  folderPath!: string;
  price!: number;

  constructor(id: number, title: string, folderPath: string, price: number) {
    this.id = id;
    this.title = title;
    this.folderPath = folderPath;
    this.price = price;
  }
}
