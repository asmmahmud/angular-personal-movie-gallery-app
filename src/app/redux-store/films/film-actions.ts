import * as allActions from '../all-actions';
import {AnyAction} from 'redux';
import {FilmModel} from '../data-models/FilmModel';

export class FilmActions {
  static loadFilmsAsyncAction() {
    return {
      type: allActions.LOAD_ALL_FILMS_START
    };
  }
  static loadFilmsSuccess(payload): AnyAction {
    return ({
      type: allActions.LOAD_ALL_FILMS_SUCCESS,
      payload,
    });
  }
  static loadFilmsDummyAction(): AnyAction {
    return ({
      type: allActions.LOAD_ALL_FILMS_DUMMY
    });
  }
  static loadFilmsFailure(errorMessage: string, errorStatus: string): AnyAction {
    return ({
      type: allActions.LOAD_ALL_FILMS_FAILURE,
      payload: null,
      error: {errorMessage, errorStatus}
    });
  }
  static makeAFilmWatched(filmId): AnyAction {
    return {
      type: allActions.MAKE_A_FILM_WATCHED_START,
      payload: filmId
    };
  }
  static makeAFilmWatchedSuccess(film: FilmModel): AnyAction {
    return {
      type: allActions.MAKE_A_FILM_WATCHED_SUCCESS,
      payload: film
    };
  }
  static makeAFilmWatchedFailure(errorMessage: string, errorStatus: string): AnyAction {
    return {
      type: allActions.MAKE_A_FILM_WATCHED_FAILURE,
      payload: null,
      error: {errorMessage, errorStatus}
    };
  }
  static addPersonalNoteStart(filmId: string, note: string): AnyAction {
    return {
      type: allActions.ADD_PERSONAL_NOTE_START,
      payload: {filmId, note}
    };
  }
  static addPersonalNoteSuccess(film: FilmModel): AnyAction {
    return {
      type: allActions.ADD_PERSONAL_NOTE_SUCCESS,
      payload: film
    };
  }
  static addPersonalNoteFailure(errorMessage: string, errorStatus: string): AnyAction {
    return {
      type: allActions.ADD_PERSONAL_NOTE_FAILURE,
      payload: null,
      error: {errorMessage, errorStatus}
    };
  }
}
