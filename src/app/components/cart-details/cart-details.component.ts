import { Component, OnInit } from '@angular/core';
import { CartService } from '../../services/cart.service';
import { CartItem } from '../../common/cart-item';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart-details',
  imports: [CommonModule, RouterModule],
  templateUrl: './cart-details.component.html',
  styleUrl: './cart-details.component.css',
})
export class CartDetailsComponent implements OnInit {
  cartItems: CartItem[] = [];
  totalPrice: number = 0;

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.listCartDetails();
  }

  listCartDetails() {
    this.cartItems = this.cartService.cartItems;

    this.cartService.totalPrice.subscribe((data) => (this.totalPrice = data));
  }

  removeCartItem(cartItem: CartItem) {
    this.cartService.removeCartItem(cartItem);
  }
}
