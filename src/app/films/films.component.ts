import {Component, OnDestroy, OnInit} from '@angular/core';
import {select} from '@angular-redux/store';
import {FilmService} from '../shared/films/film.service';
import {FilmModel} from '../redux-store/data-models/FilmModel';
import {Subscription} from 'rxjs/Subscription';
import {IAllFilms, IFilmPagination, IQueryParams} from '../redux-store/data-models/interfaces';
import {NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {FilmDetailComponent} from './film-detail/film-detail.component';
import {ActivatedRoute, ParamMap, Router} from '@angular/router';
import {Observable} from 'rxjs/Observable';
import '../shared/rxjs-imports';

@Component({
  selector: 'app-films',
  templateUrl: './films.component.html',
  styleUrls: ['./films.component.css']
})
export class FilmsComponent implements OnInit, OnDestroy {
  subscriptions: Subscription;
  filmsToShow: Array<FilmModel> = [];
  totalItemCount = 0;
  genre = '';
  currentPage = 1;
  listOfPages = [];
  sortCriteria = 'release_year';
  sortingOrder = 'desc';
  searchTerm = '';
  isLoggedIn: boolean;
  @select(['films', 'allFilms']) allFilms$: Observable<IAllFilms>;
  @select(['films', 'isFilmLoading']) isFilmLoading$: Observable<boolean>;
  @select(['auth', 'isLoggedIn']) isLoggedIn$: Observable<boolean>;
  // @select(['allStatuses', 'isFilmUpdating']) isFilmUpdating$: Observable<boolean>;

  constructor(private route: ActivatedRoute,
              private router: Router,
              private filmService: FilmService,
              private modalService: NgbModal) {
  }
  openModal(filmId: string) {
    const modalRef = this.modalService.open(FilmDetailComponent);
    // modalRef.componentInstance.personalNote = film.personalNote;
    // const newFilm = new FilmModel();
    // newFilm.setData(film);
    modalRef.componentInstance.filmId = filmId;
  }
  ngOnInit() {
    this.subscriptions = this.filmService
      .pagination$
      .subscribe((pagination: IFilmPagination) => {
        this.filmsToShow = pagination.filmsToShow;
        this.currentPage = +pagination.currentPage;
        this.genre = pagination.genre;
        this.totalItemCount = pagination.totalItems;
        const numberOfPages = Math.ceil(pagination.totalItems / this.filmService.pageSize);
        this.listOfPages = new Array(numberOfPages).fill(1).map((v, i) => i + 1);
        this.sortCriteria = pagination.sortCriteria;
        this.sortingOrder = pagination.sortingOrder;
        this.searchTerm = pagination.searchTerm;

      });

    this.subscriptions.add(this.route.queryParamMap
      .switchMap((params: ParamMap) => {
        let searchTerm;
        // console.log('query Params: ', params.keys);
        const genre = params.has('genre') ? params.get('genre') : null;
        const sortCriteria = params.has('sort') ? params.get('sort') : null;
        const sortingOrder = params.has('dir') ? params.get('dir') : null;

        if (params.has('q')) {
          searchTerm = params.get('q') ? params.get('q') : '';
        } else {
          searchTerm = null;
        }
        const currentPage = params.has('p') ? +params.get('p') : null;
        this.filmService.setAllProperties(genre, searchTerm, sortCriteria, sortingOrder, currentPage);
        return this.allFilms$.filter((allFilms: IAllFilms) => Object.keys(allFilms).length > 0);
      })
      .subscribe((allFilms: IAllFilms) => {
        // console.log(allFilms);
        this.filmService.loadAllFilmsSync(allFilms);
        this.filmService.refreshTheList();
        console.log('List refreshed. ');
      }));
  }
  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
  }
  buildQueryParams(pageNo) {
    const queryParams: IQueryParams = {
      p: pageNo,
      sort: this.sortCriteria,
      dir: this.sortingOrder
    };
    if (this.genre) {
      queryParams.genre = this.genre;
    }
    if (this.searchTerm) {
      queryParams.q = this.searchTerm;
    }
    return queryParams;
  }

  pageChangeReceiver(newPageNo: Number) {
    this.filmService.generateFilmsToShow(newPageNo);
  }
  sortCriteriaChangeReceiver(newCriteria: string) {
    this.filmService.setNewSortCriteria(newCriteria);
  }
  sortOrderChangeReceiver(newSortOrder: string) {
    this.filmService.setNewSortOrder(newSortOrder);
  }
  searchTermChangeReceiver(newSearchTerm: string) {
    this.filmService.setNewSearchTerm(newSearchTerm);
  }
  makeItWatchedHandler(filmId: string) {
    this.filmService.makeAFilmWatched(filmId);
  }
  getFilmKey(_, film: FilmModel) {
    return film ? film.id : null;
  }
}
