import { Component, Input, OnInit } from '@angular/core';
import { Tweet } from 'src/app/models/tweet';

@Component({
  selector: 'app-tweet',
  templateUrl: './tweet.component.html',
  styleUrls: ['./tweet.component.css']
})
export class TweetComponent implements OnInit {

  @Input() tweet!: Tweet;
  constructor() { }

  ngOnInit(): void {
  }

}
