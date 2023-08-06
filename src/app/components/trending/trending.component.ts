import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-trending',
  templateUrl: './trending.component.html',
  styleUrls: ['./trending.component.css']
})
export class TrendingComponent implements OnInit {

  trendings: {trendingIn: string, hashTag: string, trendingWith: string}[] = [
    {
      trendingIn: "Technology.Trending",
      hashTag: "#MicrosoftTeams",
      trendingWith: "2,990 Tweets"
    },
    {
      trendingIn: "Entertainment.Trending",
      hashTag: "#PathaanReview",
      trendingWith: "Trending with Blockbuster,#DeepikaPadukone"
    },
    {
      trendingIn: "Entertainment.Trending",
      hashTag: "BoycottbollywoodCompletely",
      trendingWith: "24K Tweets"
    },
    /*{
      trendingIn: "Trending in India",
      hashTag: "Tata Salt",
      trendingWith: "Trending with #HarSawaalUthega"
    },
    {
      trendingIn: "Entertainment.Trending",
      hashTag: "#Thalapathy67",
      trendingWith: "62.5K Tweets"
    }*/
  ];

  constructor() { }

  ngOnInit(): void {
  }

}
