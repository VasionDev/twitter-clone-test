import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private baseUrl = 'https://missingdata.pythonanywhere.com';
  private tokenKey = 'jwt-token';
  private jwtToken: string | null = null;

  constructor(private http: HttpClient) {
    this.jwtToken = localStorage.getItem('jwtToken');
  }

  signup(username: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.baseUrl}/signup`, { username, email, password });
  }

  login(email: string, password: string): Observable<string> {
    return this.http.post<any>(`${this.baseUrl}/login`, { email, password }).pipe(
      map(response => response.token)
    );
  }

  logout(): void {
    this.jwtToken = null;
    localStorage.removeItem(this.tokenKey);
  }

  setToken(token: string): void {
    this.jwtToken = token
    localStorage.setItem(this.tokenKey, token);
  }

  isLoggedIn(): boolean {
    const tokenFound = localStorage.getItem(this.tokenKey);
    console.log(tokenFound)
    return tokenFound ? true : false;
  }

  getToken(): any {
    return localStorage.getItem(this.tokenKey);
  }
}
