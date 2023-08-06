import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReplaySubject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-my-tweets',
  templateUrl: './my-tweets.component.html',
  styleUrls: ['./my-tweets.component.css']
})
export class MyTweetsComponent implements OnInit, OnDestroy {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  allTweets: any[] = [];
  currentPage = 1;
  pageSize = 1;
  totalPages = 1;
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
    this.getAllTweets();
    this.getTweetStatus();
  }

  getTweetStatus() {
    this.userService.tweetStatus$
    .pipe(takeUntil(this.destroyed$))
    .subscribe(res=> {
      if(res) {
        this.getAllTweets();
      }
    })
  }

  getAllTweets() {
    this.userService.getMyTweets(this.currentPage, this.pageSize)
    .pipe(takeUntil(this.destroyed$))
    .subscribe(res=> {
      this.allTweets = res.my_tweets;
      this.totalPages = Math.ceil(res.count / this.pageSize);
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true)
  }

}
