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
import { CaliZoneAntonyService } from '../../services/cali-zone-antony.service';
import { State } from '../../common/state';
import { Country } from '../../common/country';
import { Order } from '../../common/order';
import { OrderItem } from '../../common/order-item';
import { CheckoutService } from '../../services/checkout.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;

  countries: Country[] = [];
  addressStates: State[] = [];

  totalPrice: number = 0;

  constructor(
    private checkoutService: CheckoutService,
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private caliZoneAntonyService: CaliZoneAntonyService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.reviewCartDetails();

    this.checkoutForm = this.formBuilder.group({
      user: this.formBuilder.group({
        fullName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          this.notOnlyWhitespace,
        ]),
        email: new FormControl('', [
          Validators.required,
          // ^$ finisher
          // [ accepted terms ]
          // + concatenate
          // outside [] must terms
          // \\ escaped terms
          // {min,max} terms
          Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
        ]),
      }),
      address: this.formBuilder.group({
        street: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          this.notOnlyWhitespace,
        ]),
        city: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          this.notOnlyWhitespace,
        ]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          this.notOnlyWhitespace,
        ]),
      }),
    });

    this.caliZoneAntonyService.getCountries().subscribe((data) => {
      this.countries = data;
    });
  }

  reviewCartDetails(): void {
    this.cartService.totalPrice.subscribe(
      (totalPrice) => (this.totalPrice = totalPrice)
    );
  }

  onSubmit() {
    if (this.checkoutForm.invalid) {
      this.checkoutForm.markAllAsTouched();
      return;
    }

    let order = new Order();

    order.price = this.totalPrice;

    const cartItems = this.cartService.cartItems;

    let orderItems: OrderItem[] = cartItems.map(
      (currentCartItem) => new OrderItem(currentCartItem)
    );

    order.orderItems = orderItems;

    order.user = this.checkoutForm.controls['user'].value;
    order.address = this.checkoutForm.controls['address'].value;

    const state: State = JSON.parse(JSON.stringify(order.address.state));
    const country: Country = JSON.parse(JSON.stringify(order.address.country));

    order.address.state = state.title;
    order.address.country = country.title;

    if (!this.checkoutForm.invalid) {
      this.checkoutService.placeOrder(order).subscribe({
        next: (Response: any) => {
          console.log('Order received!');

          this.resetCart();
        },
        error: (err: any) => {
          console.log(err.message);
        },
      });
    } else {
      this.checkoutForm.markAllAsTouched;
      return;
    }
  }
  resetCart() {
    this.cartService.cartItems = [];
    this.cartService.updateCartTotals();

    this.checkoutForm.reset();

    this.router.navigateByUrl('/overview');
  }

  getStates(formGroupName: string) {
    const formGroup = this.checkoutForm.get(formGroupName);

    const countryCode = formGroup?.value.country.code;

    this.caliZoneAntonyService.getStates(countryCode).subscribe((data) => {
      this.addressStates = data;

      formGroup!.get('state')?.setValue(data[0]);
    });
  }

  get fullName() {
    return this.checkoutForm.get('user.fullName');
  }
  get email() {
    return this.checkoutForm.get('user.email');
  }
  get country() {
    return this.checkoutForm.get('address.country');
  }
  get state() {
    return this.checkoutForm.get('address.state');
  }
  get street() {
    return this.checkoutForm.get('address.street');
  }
  get zipCode() {
    return this.checkoutForm.get('address.zipCode');
  }
  get city() {
    return this.checkoutForm.get('address.city');
  }

  notOnlyWhitespace(control: FormControl): ValidationErrors | null {
    if (control.value != null && control.value.trim().length === 0) {
      //invalid, return error object
      return { notOnlyWhitespace: true };
    } else {
      // valid, return null
      return null;
    }
  }
}
