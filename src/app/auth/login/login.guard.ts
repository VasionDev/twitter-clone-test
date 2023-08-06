import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { AuthService } from '../auth.service';

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): boolean | UrlTree {
    if (this.authService.isLoggedIn()) {
      // User is already logged in, redirect to home page
      return this.router.parseUrl('/');
    } else {
      // Allow access to login page if user is not logged in
      return true;
    }
  }
}
