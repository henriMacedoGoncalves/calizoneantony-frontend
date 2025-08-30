import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-overview',
  imports: [],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.css',
})
export class OverviewComponent implements OnInit {
  constructor(
    private authService: AuthService,
    private loginService: LoginService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.authService.user$.subscribe((user) => {
      this.loginService.userExists(user?.sub!).subscribe({
        next: (exists: boolean) => {
          if (!exists) {
            this.router.navigate(['/profile']);
          }
        },
        error: (err) => console.error(err),
      });
    });
  }
}
