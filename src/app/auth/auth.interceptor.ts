import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private authService: AuthService) { }
  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('jwt-token');
    if (token) {
      if (this.isTokenExpired(token)) {
        this.authService.logout();
        return throwError(() => new HttpErrorResponse({ status: 401, error: 'Token expired' }));
      }
      const modifiedRequest = request.clone({
        setHeaders: {
          'X-Jwt-Token': `Bearer ${token}`
        }
      });
      return next.handle(modifiedRequest);
    }
    return next.handle(request).pipe(
      catchError((error: HttpErrorResponse) => {
        return throwError(()=> new HttpErrorResponse({error: error}));
      })
    );
  }

  private isTokenExpired(token: string): boolean {
    const tokenData = JSON.parse(atob(token.split('.')[1]));
    const expirationDate = new Date(tokenData.exp * 1000);
    return expirationDate <= new Date();
  }
}
