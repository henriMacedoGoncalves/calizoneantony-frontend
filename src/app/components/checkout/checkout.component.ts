import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { CartService } from '../../services/cart.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;

  totalPrice: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService
  ) {}

  ngOnInit(): void {
    this.reviewCartDetails();

    this.checkoutForm = this.formBuilder.group({
      user: this.formBuilder.group({
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        lastName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        email: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
      }),
      billingAddress: this.formBuilder.group({}),
    });
  }

  reviewCartDetails(): void {
    this.cartService.totalPrice.subscribe(
      (totalPrice) => (this.totalPrice = totalPrice)
    );
  }

  onSubmit() {}

  notOnlyWhitespace(control: FormControl): ValidationErrors {
    if (control.value != null && control.value.trim().length === 0) {
      return { notOnlyWhitespace: true };
    } else {
      return { notOnlyWhitespace: false };
    }
  }

  get firstName() {
    return this.checkoutForm.get('user.firstName');
  }
}
