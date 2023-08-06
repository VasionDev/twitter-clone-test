import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { ReplaySubject, debounceTime, distinctUntilChanged, takeUntil } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit, OnDestroy {
  private destroyed$: ReplaySubject<boolean> = new ReplaySubject(1);
  searchControl: FormControl = new FormControl();
  searchResults: User[] = [];
  constructor(private userService: UserService, private router: Router) { }

  ngOnInit(): void {
  }

  search() {
    const username = this.searchControl.value;
    if (username && username.trim() !== '') {
      this.userService.searchUsersByUsername(username)
      .pipe(
        takeUntil(this.destroyed$),
        debounceTime(1000), 
        distinctUntilChanged()
      )
      .subscribe(res=> {
        this.searchResults = res.search_results;
        this.userService.setSearchResult(this.searchResults);
        this.router.navigate(['/search']);
      })
    }
  }

  ngOnDestroy(): void {
    this.destroyed$.next(true);
  }

}
