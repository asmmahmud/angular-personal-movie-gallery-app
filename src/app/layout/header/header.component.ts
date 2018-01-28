import {Component, ElementRef, EventEmitter, Output, ViewChild} from '@angular/core';
import {FilmService} from '../../shared/films/film.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  foundFilms: Array<{ filmId: string; title: string }> = [];
  navbarSearch: string;
  isCollapsed = false;
  isLoggedIn = false;
  isDropDownOpen = false;
  @Output() toggleClick = new EventEmitter<boolean>();
  @Output() signOutAction = new EventEmitter<boolean>();
  @ViewChild('searchNavItem') searchNavItem: ElementRef;

  constructor(private filmService: FilmService) {
  }
  userSignOut(event: Event) {
    event.preventDefault();
    this.signOutAction.emit(true);
  }
  toggleDropdown(event: Event) {
    event.preventDefault();
    event.stopImmediatePropagation();
    this.toggleClick.emit(true);
  }
  navbarSearchHandler() {
    const allFilms = this.filmService.currentFilms.allFilms;
    const filmIds = Object.keys(allFilms);
    if (filmIds.length && this.navbarSearch && this.navbarSearch.length >= 2) {
      let queryStr = this.navbarSearch.replace(/\s+/g, ' ');
      queryStr = queryStr.toLowerCase();
      this.foundFilms = filmIds
        .filter((filmId: string) => {
          return allFilms[filmId].searchByProp('title', queryStr) ||
            allFilms[filmId].searchByProp('director', queryStr) ||
            allFilms[filmId].searchByProp('casts', queryStr);
        })
        .map((filmId: string) => {
          return {
            filmId: filmId,
            title: allFilms[filmId].title
          };
        });
    } else {
      this.foundFilms = [];
    }
    // console.log(this.foundFilms);
  }
  hideNavbarAutocomplete() {
    this.foundFilms = [];
  }
}
