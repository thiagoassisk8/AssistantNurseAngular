import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { AuthService } from "../../shared/services/auth.service";
import { Observable } from 'rxjs';
@Injectable({ providedIn: 'root' })
export class AuthRedirect implements CanActivate {

  constructor(
    public authService: AuthService,
    public router: Router
  ) { }


  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
    if (this.authService.isCurrentUser == true) {
      this.router.navigate(['dashboard'])
    }
    return true;
  }
}
