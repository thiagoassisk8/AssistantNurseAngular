import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';

export type AuthDto = {
  token: string,
}

@Injectable({
  providedIn: 'root',

})

export class AuthService {

  // TODO move privateUrl to .env and turn that into Environment Variables
  private privateUrl = 'http://localhost:3000';


  constructor(
    public router: Router,
    private _http: HttpClient,
    // TODO Separate serviceLogic from components
    private snackBar: MatSnackBar
  ) {}

  getStatus(): Observable<User> {
    const token = sessionStorage.getItem("token");

    if (token) {
      return this._http.get<User>("http://localhost:3000/auth/status", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
    } else {
      console.error("No token found. Please log in first.");
      throw new Error("No token found");
    }
  }

  SignIn(email: string, password: string): void {
    this._http.post<AuthDto>(this.privateUrl + "/auth/login", { email, password }).subscribe({
      next: (response) => {

        if (response.token) {

          sessionStorage.setItem("token", response.token)

          this.router.navigate(['dashboard']);
        }
      },
      error: (error) => {
        // TODO Separate serviceLogic from components
        this.snackBar.open(`Login failed: ${error.status} ${error.message}`, 'Close', {
          duration: 5000,

        });

        console.error("Erro ao fazer login:", error);

      },
      complete: () => {
        // TODO Create notification component
        console.info('Login attempt complete');
      }
    });
  }


  SignUp(name: string, email: string, password: string): void {
    this._http.post<AuthDto>(this.privateUrl + "/users/register", { name, email, password }).subscribe({
      next: (response) => {




      },
      error: (error) => {
        // TODO Separate serviceLogic from components
        this.snackBar.open(`Register attempt failed: ${error.status} ${error.message}`, 'Close', {
          duration: 5000,
        });


      },
      complete: () => {
        // TODO Separate serviceLogic from components
        this.snackBar.open(`${email} was registered successfully`, 'Close', {
          duration: 5000,
        });

        this.router.navigate(['sign-in']);
        console.info('Signup process complete');
      }
    });
  }

  get isCurrentUser(): boolean {
    const token = sessionStorage.getItem('token');
    return token !== null;
  }

  SignOut() {
    sessionStorage.removeItem("token");
    this.router.navigate(['sign-in']);
  }
}
