import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../services/login.service';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CartStatusComponent } from '../cart-status/cart-status.component';
import { AuthService } from '@auth0/auth0-angular';

@Component({
  selector: 'app-login-status',
  imports: [CommonModule, RouterModule, CartStatusComponent],
  templateUrl: './login-status.component.html',
  styleUrl: './login-status.component.css',
})
export class LoginStatusComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.isAuthenticated$.subscribe((status) => {
      this.isAuthenticated = status;
    });
  }

  login() {
    this.authService.loginWithRedirect({
      appState: { target: '/overview' },
    });
  }

  get authUser() {
    return this.authService.user$;
  }
}
