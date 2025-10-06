import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-profile',
  imports: [RouterModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css',
})
export class ProfileComponent implements OnInit {
  isAuthenticated: boolean = false;

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.isAuthenticated.subscribe((status) => {
      this.isAuthenticated = status;
    });
  }

  logout() {
    this.userService.logout();
  }
}
