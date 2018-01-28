import {Injectable} from '@angular/core';
import {IAllFilms, IAppState, IFilmPagination} from '../../redux-store/data-models/interfaces';
import {NgRedux} from '@angular-redux/store';
import {FilmActions} from '../../redux-store/films/film-actions';
import {Observable} from 'rxjs/Observable';
import {CurrentFilmsList} from '../../redux-store/data-models/CurrentFilmList';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class FilmService {
  currentFilms: CurrentFilmsList;
  private paginationSubject$ = new Subject<IFilmPagination>();
  private genreSubject$ = new BehaviorSubject<string>('');
  pagination$: Observable<IFilmPagination>;
  genre$: Observable<string>;
  currentPage = 1;
  numberOfPages = 0;
  pageSize = 25;
  constructor(private ngRedux: NgRedux<IAppState>) {
    this.currentFilms = new CurrentFilmsList();
    this.pagination$ = this.paginationSubject$.asObservable();
    this.genre$ = this.genreSubject$.asObservable();
  }
  loadAllFilmsSync(allFilms: IAllFilms) {
    this.currentFilms.setAllFilms(allFilms);
  }
  loadAllFilmsAsync() {
    this.ngRedux.dispatch(FilmActions.loadFilmsAsyncAction());
  }
  makeAFilmWatched(filmId) {
    this.ngRedux.dispatch(FilmActions.makeAFilmWatched(filmId));
  }
  setAllProperties(genre, searchTerm, sortCriteria, sortingOrder, currentPage) {
    let newOrder = null;
    if (genre && !searchTerm) {
      searchTerm = '';
    }
    if (currentPage === null && (genre !== null || searchTerm !== null || sortCriteria !== null || sortingOrder !== null)) {
      currentPage = 1;
    }
    // console.log('setAllProperties 1: ', genre, searchTerm, sortCriteria, sortingOrder, currentPage);
    if (sortingOrder) {
      newOrder = sortingOrder === 'desc' ? 1 : -1;
    }
    this.currentFilms.setAllProperties(genre, searchTerm, sortCriteria, newOrder);
    if (currentPage) {
      this.currentPage = currentPage;
    }
  }

  setNewSortCriteria(criteria: string) {
    this.currentFilms.setSortCriteria(criteria);
    this.generateFilmsToShow(1);
  }
  setNewSortOrder(sortOrder: string) {
    const newOrder = sortOrder === 'desc' ? 1 : -1;
    this.currentFilms.setSortingOrder(newOrder);
    this.generateFilmsToShow(1);
  }
  setNewSearchTerm(searchTerm: string) {
    this.currentFilms.setNewSearchTerm(searchTerm);
    this.generateFilmsToShow(1);
  }
  refreshTheList() {
    this.currentFilms.applyFilters();
    this.generateFilmsToShow();
  }
  generateFilmsToShow(pageNo = null) {
    if (pageNo) {
      this.currentPage = pageNo;
    }
    const totalItems = this.currentFilms.filmIds.length;
    this.numberOfPages = Math.ceil(totalItems / this.pageSize);
    const start = ((this.currentPage - 1) * this.pageSize);
    const end = (this.currentPage * this.pageSize);
    const filmsToShow = this.currentFilms.getFilms(start, end);
    const dataToSupply = {
      filmsToShow,
      genre: this.currentFilms.genre,
      searchTerm: this.currentFilms.searchTerm,
      sortCriteria: this.currentFilms.sortCriteria,
      sortingOrder: this.currentFilms.sortingOrder > 0 ? 'desc' : 'asc',
      currentPage: this.currentPage,
      totalItems: totalItems
    };
    // console.log('generateFilmsToShow: ', dataToSupply);
    this.genreSubject$.next(this.currentFilms.genre);
    this.paginationSubject$.next(dataToSupply);
  }
  addPersonalNote(filmId, personalNote) {
    this.ngRedux.dispatch(FilmActions.addPersonalNoteStart(filmId, personalNote));
  }
}
