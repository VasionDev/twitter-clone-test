// user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { User } from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private apiUrl = 'https://missingdata.pythonanywhere.com'; // Replace with your API URL
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('jwtToken')}` // Assuming you store the JWT token in local storage after login
    })
  };

  private isNewTweetPost: BehaviorSubject<boolean> = new BehaviorSubject(false);
  private searchData: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

  constructor(private http: HttpClient) { }

  setNewTweetStatus(status: boolean) {
    this.isNewTweetPost.next(status);
  }

  get tweetStatus$() {
    return this.isNewTweetPost.asObservable();
  }

  // Get a list of users that the logged-in user can follow
  exploreUsers(): Observable<any> {
    return this.http.get<User[]>(`${this.apiUrl}/users`, this.httpOptions);
  }

  followUser(userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/follow`, { user_id: userId });
  }

  unfollowUser(userId: number): Observable<any> {
    return this.http.post(`${this.apiUrl}/unfollow`, { user_id: userId });
  }

  getUserById(userId: number): Observable<User> {
    return this.http.get<User>(`${this.apiUrl}/users/${userId}`, this.httpOptions);
  }

  getUserTweets(userId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/users/${userId}/tweets`, this.httpOptions);
  }

  makeTweet(tweetContent: string) {
    return this.http.post<any>(`${this.apiUrl}/tweet`, {content: tweetContent}, this.httpOptions);
  }

  getMyTweets(page: number, size: number): Observable<any> {
    const params = new HttpParams()
      .set('page', page.toString())
      .set('size', size.toString());

    return this.http.get<any>(`${this.apiUrl}/my-tweets`, { ...this.httpOptions });
  }

  getUserFollowers(userId: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users/${userId}/followers`, this.httpOptions);
  }

  getUserFollowings(userId: number): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/users/${userId}/following`, this.httpOptions);
  }

  getMyFollowings(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/following`, this.httpOptions);
  }

  getMyTimeline(): Observable<any> {
    return this.http.get<any>(`${this.apiUrl}/timeline`, this.httpOptions);
  }

  searchUsersByUsername(username: string): Observable<any> {
    const requestBody = { token: username };
    return this.http.post<any>(`${this.apiUrl}/search`, requestBody, this.httpOptions);
  }

  setSearchResult(data: any[]) {
    this.searchData.next(data)
  }

  get searchResult$() {
    return this.searchData.asObservable();
  }
}
