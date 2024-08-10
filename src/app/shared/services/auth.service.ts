import { Injectable, NgZone } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import {  tap } from 'rxjs/operators';

export type AuthDto = {
  token: string,
}

@Injectable({
  providedIn: 'root',
})

export class AuthService {
  userData: any; // change to User
  private privateUrl = 'http://localhost:3000';



  constructor(
    public router: Router,
    public ngZone: NgZone,
    private _http: HttpClient
  ) {}

  SignIn(email: string, password: string): void {
    console.log("teste");

    this._http.post<AuthDto>(this.privateUrl + "/auth/login", { email, password }).subscribe({
      next: (response) => {
        console.log(response);
        if (response.token) {
          console.log("aqui?");
          sessionStorage.setItem("token", response.token)

          this.router.navigate(['dashboard']);
        }
      },
      error: (error) => {
        console.error("Erro ao fazer login:", error);

      },
      complete: () => {
        console.info('Login attempt complete');
      }
    });
  }




  SignUp(name: string, email: string, password: string): void {
    this._http.post<AuthDto>(this.privateUrl + "/users/register", { name, email, password }).subscribe({
      next: (response) => {
        // console.log("Signup successful", response);

      },
      error: (error) => {
        this.router.navigate(['dashboard']);
        console.error("Error during signup:", error);

      },
      complete: () => {
        console.info('Signup process complete');
      }
    });
  }

  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('token')!);
    return user !== null ? true : false;
  }



  SignOut() {
    sessionStorage.removeItem("token");
    this.router.navigate(['sign-in']);
  }
}
