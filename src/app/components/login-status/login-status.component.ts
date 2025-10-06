import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartStatusComponent } from '../cart-status/cart-status.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-login-status',
  imports: [CommonModule, RouterModule, CartStatusComponent],
  templateUrl: './login-status.component.html',
  styleUrl: './login-status.component.css',
})
export class LoginStatusComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.isAuthenticated.subscribe((status) => {
      this.isAuthenticated = status;
    });
  }

  login() {
    this.userService.login();
  }

  get authUser() {
    return this.userService.authUser;
  }
}
