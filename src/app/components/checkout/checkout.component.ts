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

@Component({
  selector: 'app-checkout',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrl: './checkout.component.css',
})
export class CheckoutComponent implements OnInit {
  checkoutForm!: FormGroup;

  countries: Country[] = [];
  billingAddressStates: State[] = [];

  totalPrice: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private cartService: CartService,
    private caliZoneAntonyService: CaliZoneAntonyService
  ) {}

  ngOnInit(): void {
    this.reviewCartDetails();

    this.checkoutForm = this.formBuilder.group({
      user: this.formBuilder.group({
        firstName: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
          this.notOnlyWhitespace,
        ]),
        lastName: new FormControl('', [
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
      billingAddress: this.formBuilder.group({
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
      creditCard: this.formBuilder.group({}),
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

      let order = new Order();
    }
  }

  getStates(formGroupName: string) {
    const formGroup = this.checkoutForm.get(formGroupName);

    const countryCode = formGroup?.value.country.code;

    this.caliZoneAntonyService.getStates(countryCode).subscribe((data) => {
      this.billingAddressStates = data;

      formGroup!.get('state')?.setValue(data[0]);
    });
  }

  get firstName() {
    return this.checkoutForm.get('user.firstName');
  }
  get lastName() {
    return this.checkoutForm.get('user.lastName');
  }
  get email() {
    return this.checkoutForm.get('user.email');
  }
  get country() {
    return this.checkoutForm.get('user.country');
  }
  get state() {
    return this.checkoutForm.get('user.state');
  }
  get street() {
    return this.checkoutForm.get('user.street');
  }
  get zipCode() {
    return this.checkoutForm.get('user.zipCode');
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
