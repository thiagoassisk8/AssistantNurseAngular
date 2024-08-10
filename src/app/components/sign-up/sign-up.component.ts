import { Component, OnInit } from '@angular/core';
import { AuthService } from "../../shared/services/auth.service";
//  TODO Create ErroHandlers
@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  template: `<input type="password" [(ngModel)]="password">`
})
export class SignUpComponent implements OnInit {
  constructor(
    public authService: AuthService
  ) { }
  ngOnInit() { }
  hide = true;
  password: string = '';
  showPassword = false;

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }
}
