import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ReplaySubject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    
  }

  login(): void {
    this.authService.login(this.email, this.password)
    .pipe(takeUntil(this.destroyed$))
    .subscribe(token => {
      this.authService.setToken(token);
      this.router.navigate(['/']);
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }
}
