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
      billingAddress: this.formBuilder.group({
        street: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        city: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
        ]),
        state: new FormControl('', [Validators.required]),
        country: new FormControl('', [Validators.required]),
        zipCode: new FormControl('', [
          Validators.required,
          Validators.minLength(2),
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
    console.log(this.checkoutForm);
  }

  getStates(formGroupName: string) {
    const formGroup = this.checkoutForm.get(formGroupName);

    const countryCode = formGroup?.value.country.code;
    const countryName = formGroup?.value.country.title;

    console.log(`${formGroupName} country code: ${countryCode}`);
    console.log(`${formGroupName} country name: ${countryName}`);

    this.caliZoneAntonyService.getStates(countryCode).subscribe((data) => {
      this.billingAddressStates = data;

      formGroup!.get('state')?.setValue(data[0]);
    });
  }
}
