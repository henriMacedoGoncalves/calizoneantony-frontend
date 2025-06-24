import { Injectable } from '@angular/core';
import { CartItem } from '../common/cart-item';
import { Ebook } from '../common/ebook';
import { OnlineCoaching } from '../common/online-coaching';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CartService {
  cartItems: CartItem[] = [];
  totalQuantity: Subject<number> = new BehaviorSubject<number>(0);
  totalPrice: Subject<number> = new BehaviorSubject<number>(0);

  storage: Storage = localStorage;

  constructor() {
    let data = JSON.parse(this.storage.getItem('cartItems')!);

    if (data != null) {
      this.cartItems = data;

      this.updateCartTotals();
    }
  }

  updateCartTotals() {
    let totalPrice: number = 0;
    let totalQuantity: number = 0;

    for (let currentCartItem of this.cartItems) {
      totalPrice += currentCartItem.price;
      totalQuantity++;
    }

    this.totalPrice.next(totalPrice);
    this.totalQuantity.next(totalQuantity);

    this.updateStorage();
  }

  updateStorage() {
    this.storage.setItem('cartItems', JSON.stringify(this.cartItems));
  }

  addToCart(cartItem: CartItem) {
    let alreadyExists: boolean = false;
    let existingCartItem: CartItem | undefined = undefined;

    if (this.cartItems.length > 0) {
      existingCartItem = this.cartItems.find(
        (currentCartItem) => currentCartItem.id === cartItem.id
      );

      alreadyExists = existingCartItem != undefined;
    }

    if (!alreadyExists) {
      this.cartItems.push(cartItem);
    }

    this.updateCartTotals();
  }
}
