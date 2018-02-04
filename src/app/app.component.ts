import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {AuthService} from './shared/auth/auth.service';
import {select} from '@angular-redux/store';
import {Observable} from 'rxjs/Observable';
import {Router} from '@angular/router';
import {FilmService} from './shared/films/film.service';
import {FilmModel} from './redux-store/data-models/FilmModel';
import {HeaderComponent} from './layout/header/header.component';

@Component({
  selector: 'app-root',
  template: `
    <div id="main-wrapper" (click)="onDocumentClick($event.target)">
      <app-header
        (toggleClick)="toggleNavDropDown()"
        (signOutAction)="userSignOutAction()"
      ></app-header>
      <div class="container-fluid">
        <app-alert></app-alert>
        <div id="main-content" class="mt-2">
          <div class="row">
            <div class="col-md-2">
              <ul class="nav nav-pills genre-list-nav flex-column" role="tablist" aria-orientation="vertical">
                <li class="nav-item">
                  <a class="nav-link" *ngFor="let genre of listOfGenres" [routerLink]="['/films']"
                     [queryParams]="{genre: genre, q: '', p: 1}" [class.active]="genre == foundGenre"
                  >{{genre}}</a>
                </li>
              </ul>
            </div>
            <div class="col-md-10">
              <router-outlet></router-outlet>
            </div>
          </div>

        </div>
      </div>
      <app-footer></app-footer>
    </div>
  `,
  styles: [`
    .genre-list-nav a.nav-link {
      color: rgba(100, 100, 100, 1);
      text-align: center;
      text-transform: capitalize;
    }
    .genre-list-nav a.nav-link:hover {
      text-decoration: none;
      color: #d84b6b;
      background-color: transparent;
      border-bottom: 1px solid #d84b6b;
    }
    .nav-pills .nav-link.active, .nav-pills .show>.nav-link {
      background-color: transparent;
      border-bottom: 1px solid #d84b6b;
      color: #d84b6b;
    }
  `]
})
export class AppComponent implements OnInit, AfterViewInit {
  foundGenre: string;
  listOfGenres: Array<string>;
  @ViewChild(HeaderComponent) headerComponent: HeaderComponent;
  @select(['auth', 'isLoggedIn']) isLoggedIn$: Observable<boolean>;
  constructor(private authService: AuthService,
              private filmService: FilmService,
              private router: Router) {
    this.listOfGenres = FilmModel.possibleGenres;
  }
  ngOnInit() {

    this.authService.authCheckInitiate();
    this.filmService.loadAllFilmsAsync();

    this.filmService.genre$.subscribe((genre: string) => {
      setTimeout(() => {
        this.foundGenre = genre ? genre : '';
      }, 0);
    });
  }
  ngAfterViewInit() {
    this.isLoggedIn$.subscribe(isLoggedIn => {
      setTimeout(() => {
        this.headerComponent.isLoggedIn = isLoggedIn;
      }, 0);
    });
  }
  toggleNavDropDown() {
    this.headerComponent.isDropDownOpen = !this.headerComponent.isDropDownOpen;
  }
  userSignOutAction() {
    this.authService.userSignOut();
    setTimeout(() => {
      this.router.navigate(['/signin']);
    }, 0);
  }
  onDocumentClick(elem: HTMLElement) {
    if (this.headerComponent && this.headerComponent.isDropDownOpen) {
      this.headerComponent.isDropDownOpen = false;
    }
    if (this.headerComponent && this.headerComponent.searchNavItem) {
      if (!this.headerComponent.searchNavItem.nativeElement.contains(elem)) {
        this.headerComponent.hideNavbarAutocomplete();
      }
    }
  }
}
