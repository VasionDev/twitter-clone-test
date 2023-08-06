import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { LoginGuard } from './auth/login/login.guard';
import { AuthGuard } from './auth/auth.guard';
import { HomeComponent } from './components/home/home.component';
import { ContainerComponent } from './components/container/container.component';
import { FollowingComponent } from './components/following/following.component';
import { SignupComponent } from './auth/signup/signup.component';
import { MyTweetsComponent } from './components/my-tweets/my-tweets.component';
import { SearchResultComponent } from './components/search-result/search-result.component';

const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [LoginGuard] },
  { path: 'signup', component: SignupComponent },
  { path: '', canActivate: [AuthGuard], component: ContainerComponent, children: [
    {path: '', component: HomeComponent},
    {path: 'tweets', component: MyTweetsComponent},
    {path: 'following', component: FollowingComponent},
    {path: 'search', component: SearchResultComponent}
  ]},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
