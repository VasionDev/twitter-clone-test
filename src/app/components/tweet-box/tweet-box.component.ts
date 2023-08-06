import { Component, OnDestroy, OnInit } from '@angular/core';
import { ReplaySubject, takeUntil } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-tweet-box',
  templateUrl: './tweet-box.component.html',
  styleUrls: ['./tweet-box.component.css']
})
export class TweetBoxComponent implements OnInit, OnDestroy {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  tweetContent: string = '';
  constructor(
    private userService: UserService
  ) { }

  ngOnInit(): void {
  }

  onMakeTweet() {

    this.userService.makeTweet(this.tweetContent)
    .pipe(takeUntil(this.destroyed$))
    .subscribe(res=> {
      this.userService.setNewTweetStatus(true);
      this.tweetContent = '';
    });
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }

}
