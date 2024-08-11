import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { User } from '../../shared/services/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html'
})
export class DashboardComponent implements OnInit {
  user: User | null = null;

  constructor(public authService: AuthService) { }

  ngOnInit(): void {
    this.authService.getStatus().subscribe({
      next: (statusResponse: User) => {
        this.user = statusResponse;

      },
      error: (error) => {
        console.error(error);
      },
      complete: () => {
        console.info('Status request complete');
      }
    });
  }
}
