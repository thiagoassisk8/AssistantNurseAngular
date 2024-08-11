import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient} from '@angular/common/http';
import { User } from './user';
import { Observable } from 'rxjs';


export type AuthDto = {
  token: string,
}

@Injectable({
  providedIn: 'root',
})

export class AuthService {

  private privateUrl = 'http://localhost:3000';
  // TODO move privateUrl to .env and turn that into Environment Variables


  constructor(
    public router: Router,
    private _http: HttpClient
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
        console.log(response);
        if (response.token) {

          sessionStorage.setItem("token", response.token)

          this.router.navigate(['dashboard']);
        }
      },
      error: (error) => {
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
        console.log("response")
        console.log(response)
        console.log("Signup successful", response);


      },
      error: (error) => {
        // TODO Create notification component
        window.alert(`${error}`)

      },
      complete: () => {
        // TODO Create notification component
        window.alert(`${email} was registered successfully`);
        this.router.navigate(['sign-in']);
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
