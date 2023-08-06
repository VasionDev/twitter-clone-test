import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReplaySubject, takeUntil } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-following',
  templateUrl: './following.component.html',
  styleUrls: ['./following.component.css']
})
export class FollowingComponent implements OnInit, OnDestroy {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  users: User[] = [];
  constructor(
    private userService: UserService,
  ) { }

  ngOnInit(): void {
    this.getFollowing();
  }

  getFollowing(): void {
    const token = localStorage.getItem('jwt-token');
    if (token) {
      this.userService.getMyFollowings()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(res=> {
        this.users = res.followings;
      })
    }
  }

  followUser(userId: number) {
    this.userService.followUser(userId)
    .pipe(takeUntil(this.destroyed$))
    .subscribe(res=> {
      const user = this.users.find(u => u.id === userId);
      if (user) {
        user.following = true;
      }
    })
  }

  unfollowUser(userId: number) {
    this.userService.unfollowUser(userId)
    .pipe(takeUntil(this.destroyed$))
    .subscribe(res=> {
      const user = this.users.find(u => u.id === userId);
      if (user) {
        user.following = false;
      }
    })
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }

}
