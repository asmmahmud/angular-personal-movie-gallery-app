import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {ActionsObservable} from 'redux-observable';
import {of} from 'rxjs/observable/of';
import {AnyAction, Store} from 'redux';
import {Observable} from 'rxjs/Observable';
import '../../shared/rxjs-imports';
import {environment} from '../../../environments/environment';
import * as allActions from '../all-actions';
import {FilmActions} from './film-actions';
import {FilmService} from '../../shared/films/film.service';
import {IAppState} from '../data-models/interfaces';
import {FilmModel} from '../data-models/FilmModel';

@Injectable()
export class FilmEpics {
  private apiUrl = environment.apiServer;
  constructor(private http: HttpClient, private filmService: FilmService) {
  }
  allEpics() {
    return [
      this.loadAllFilmsAsyncEpic.bind(this),
      this.loadAllFilmsSyncEpic.bind(this),
      this.makeAFilmWatchedEpic.bind(this),
      this.addPersonalNoteEpic.bind(this)
    ];
  }
  loadAllFilmsAsyncEpic(action$: ActionsObservable<AnyAction>): Observable<AnyAction> {
    return action$.ofType(allActions.LOAD_ALL_FILMS_START)
      .mergeMap(() => {
        const options: { headers?: HttpHeaders; } = {};
        if (window.localStorage.getItem('access_token')) {
          options.headers = new HttpHeaders().set('Authorization',
            `Bearer ${window.localStorage.getItem('access_token')}`);
        }
        return this.http.get(`${this.apiUrl}/api/films`, options)
          .map((result: Array<any>) => {
             // console.log(result);
            return FilmActions.loadFilmsSuccess(result);
          })
          .catch((error: HttpErrorResponse) =>
            of(FilmActions.loadFilmsFailure(error.error.message, error.statusText)));
      });
  }
  loadAllFilmsSyncEpic(action$: ActionsObservable<AnyAction>, store: Store<IAppState>): Observable<AnyAction> {
    return action$.ofType(allActions.LOAD_ALL_FILMS_SUCCESS)
      .map(() => {
        const rootState = store.getState();
        this.filmService.loadAllFilmsSync(rootState.films.allFilms);
        return FilmActions.loadFilmsDummyAction();
      });
  }
  makeAFilmWatchedEpic(action$: ActionsObservable<AnyAction>): Observable<AnyAction> {
    return action$.ofType(allActions.MAKE_A_FILM_WATCHED_START)
      .mergeMap((action: AnyAction) => {
        return this.http.post(`${this.apiUrl}/api/films/update-watch-status`,
          {film_id: action.payload},
          {
            headers: new HttpHeaders().set('Authorization', `Bearer ${window.localStorage.getItem('access_token')}`)
          })
          .map((result: any) => {
            // console.log(result);
            const film = new FilmModel();
            film.setData(result);
            return FilmActions.makeAFilmWatchedSuccess(film);
          })
          .catch((error: HttpErrorResponse) =>
            of(FilmActions.makeAFilmWatchedFailure(error.error.message, error.statusText)));
      });
  }
  addPersonalNoteEpic(action$: ActionsObservable<AnyAction>): Observable<AnyAction> {
    return action$.ofType(allActions.ADD_PERSONAL_NOTE_START)
      .mergeMap((action: AnyAction) => {
        return this.http.post(`${this.apiUrl}/api/films/update-watch-status`,
          {film_id: action.payload.filmId, personal_note: action.payload.note},
          {
            headers: new HttpHeaders().set('Authorization', `Bearer ${window.localStorage.getItem('access_token')}`)
          })
          .map((result: any) => {
            // console.log(result);
            const film = new FilmModel();
            film.setData(result);
            return FilmActions.addPersonalNoteSuccess(film);
          })
          .catch((error: HttpErrorResponse) =>
            of(FilmActions.addPersonalNoteFailure(error.error.message, error.statusText)));
      });
  }
}
