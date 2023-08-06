import { HttpClient } from '@angular/common/http';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReplaySubject, takeUntil } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-who-to-follow',
  templateUrl: './who-to-follow.component.html',
  styleUrls: ['./who-to-follow.component.css'],
})
export class WhoToFollowComponent implements OnInit, OnDestroy {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  users: User[] = [];
  allUsers: User[] = [];
  following: User[] = [];
  usersPerPage = 3;
  incrementBy = 3;
  currentIndex = 0;

  constructor(
    private userService: UserService,
    ) {}

  ngOnInit(): void {
    this.getFollowing();
  }

  getFollowing(): void {
    const token = localStorage.getItem('jwt-token');
    if (token) {
      this.userService.getMyFollowings()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(res=> {
        this.following = res.followings;
        this.loadExploreUsers();
      });
    }
  }

  loadExploreUsers(): void {
    this.userService.exploreUsers()
    .pipe(takeUntil(this.destroyed$))
    .subscribe(users=> {
      const userList = users.users as User[];
      this.allUsers = userList.filter(u => !this.following.find(f=>f.id === u.id))
      this.displayUsers();
    })
  }

  displayUsers() {
    const currentUser =  this.allUsers.slice(this.currentIndex, this.currentIndex + this.usersPerPage);
    this.users.push(...currentUser)
  }

  get showLoadMoreButton(): boolean {
    return this.users.length < this.allUsers.length;
  }

  onLoadMore() {
    this.currentIndex += this.incrementBy;
    this.displayUsers();
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
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }
}
