import { CartItem } from './cart-item';

export class OrderItem {
  productId!: number;
  title!: String;
  folderPath!: String;
  price!: number;

  constructor(cartItem: CartItem) {
    this.productId = cartItem.id;
    this.title = cartItem.title;
    this.folderPath = cartItem.folderPath;
    this.price = cartItem.price;
  }
}
