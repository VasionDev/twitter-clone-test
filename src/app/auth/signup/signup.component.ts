import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { ReplaySubject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit, OnDestroy {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  username: string = '';
  email: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    
  }

  signup(): void {
    this.authService.signup(this.username, this.email, this.password)
    .pipe(takeUntil(this.destroyed$))
    .subscribe(res=> {
      this.authService.logout();
      this.router.navigate(['/login']);
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }
}
