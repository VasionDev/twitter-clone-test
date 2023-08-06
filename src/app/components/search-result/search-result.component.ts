import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReplaySubject, takeUntil } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search-result',
  templateUrl: './search-result.component.html',
  styleUrls: ['./search-result.component.css']
})
export class SearchResultComponent implements OnInit, OnDestroy {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  users: User[] = [];
  followingUsers: User[] = [];
  constructor(private userService: UserService) { }

  ngOnInit(): void {
    this.getFollowing();
    this.getSearchData();
  }

  getSearchData() {
    this.userService.searchResult$
    .pipe(takeUntil(this.destroyed$))
    .subscribe(res=> {
      this.users = res;
    })
  }

  getFollowing(): void {
    const token = localStorage.getItem('jwt-token');
    if (token) {
      this.userService.getMyFollowings()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(res=> {
        this.followingUsers = res.followings;
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

  isFollowing(userId: number) {
    const isFound = this.followingUsers.find(u=> u.id == userId);
    return isFound ? true : false;
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
