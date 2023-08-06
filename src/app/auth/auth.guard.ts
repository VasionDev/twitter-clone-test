import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
        console.log(this.authService.isLoggedIn())
    if (this.authService.isLoggedIn()) {
      return true;
    } else {
      // Redirect to login page if user is not logged in
      return this.router.parseUrl('/login');
    }
  }
}
