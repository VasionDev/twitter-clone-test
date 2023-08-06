import { Component, OnDestroy, OnInit } from '@angular/core';
import { Tweet } from 'src/app/models/tweet';
import { ReplaySubject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tweets',
  templateUrl: './tweets.component.html',
  styleUrls: ['./tweets.component.css'],
})
export class TweetsComponent implements OnInit, OnDestroy {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  allTweets: Tweet[] = [];
  tweets: Tweet[] = [];

  tweetPerPage = 5;
  incrementBy = 5;
  currentIndex = 0;


  constructor(
    private userService: UserService
  ) {
  
  }

  ngOnInit(): void {
    this.getTimeline();
  }

  getTimeline(): void {
    const token = localStorage.getItem('jwt-token');
    if (token) {
      this.userService.getMyTimeline()
      .pipe(takeUntil(this.destroyed$))
      .subscribe(res=> {
        this.allTweets = res.timeline;
        this.displayTweets();
      });
    }
  }

  displayTweets() {
    const currentUser =  this.allTweets.slice(this.currentIndex, this.currentIndex + this.tweetPerPage);
    this.tweets.push(...currentUser)
  }

  get showLoadMoreButton(): boolean {
    return this.tweets.length < this.allTweets.length;
  }

  onLoadMore() {
    this.currentIndex += this.incrementBy;
    this.displayTweets();
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }
}
