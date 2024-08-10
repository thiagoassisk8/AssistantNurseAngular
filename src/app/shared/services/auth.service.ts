import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: any;

  constructor(
    public router: Router,
    public ngZone: NgZone
  ) {

  }


  SignIn(email: string, password: string) {

  }


  SignUp(email: string, password: string) {
    console.log(email);
    console.log(password);

  }


  ForgotPassword(passwordResetEmail: string) {

  }


  get isLoggedIn(): boolean {

    return false;
  }


  SetUserData(user: any) {

  }


  SignOut() {

  }
}
