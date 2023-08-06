import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';

import { AppComponent } from './app.component';
import { LeftSidebarComponent } from './components/left-sidebar/left-sidebar.component';
import { RightSidebarComponent } from './components/right-sidebar/right-sidebar.component';
import { HomeComponent } from './components/home/home.component';
import { TweetsComponent } from './components/main-feed/tweets/tweets.component';
import { TweetComponent } from './components/main-feed/tweet/tweet.component';
import { LoginComponent } from './auth/login/login.component';
import { WhoToFollowComponent } from './components/who-to-follow/who-to-follow.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { TrendingComponent } from './components/trending/trending.component';
import { AppRoutingModule } from './app-routing.module';
import { ContainerComponent } from './components/container/container.component';
import { FollowingComponent } from './components/following/following.component';
import { SignupComponent } from './auth/signup/signup.component';
import { TweetBoxComponent } from './components/tweet-box/tweet-box.component';
import { MyTweetsComponent } from './components/my-tweets/my-tweets.component';
import { SearchComponent } from './components/search/search.component';
import { SearchResultComponent } from './components/search-result/search-result.component';

@NgModule({
  declarations: [
    AppComponent,
    LeftSidebarComponent,
    RightSidebarComponent,
    HomeComponent,
    TweetsComponent,
    TweetComponent,
    LoginComponent,
    WhoToFollowComponent,
    TrendingComponent,
    ContainerComponent,
    FollowingComponent,
    SignupComponent,
    TweetBoxComponent,
    MyTweetsComponent,
    SearchComponent,
    SearchResultComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
