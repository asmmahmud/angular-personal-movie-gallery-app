import {IFilmState} from '../data-models/interfaces';
import {AnyAction} from 'redux';
import * as allActions from '../all-actions';
import {FilmModel} from '../data-models/FilmModel';

export const filmsInitialState: IFilmState = {
  allFilms: {},
  filmIds: [],
  isFilmLoading: false,
};

export const filmReducer = (state: IFilmState = filmsInitialState, action: AnyAction): IFilmState => {
  switch (action.type) {
    case allActions.LOAD_ALL_FILMS_START: {
      return {
        ...state,
        isFilmLoading: true
      };
    }
    case allActions.LOAD_ALL_FILMS_SUCCESS: {
      const allFilms = {}, filmIds = [];
      action.payload.forEach((filmData) => {
        const film = new FilmModel();
        film.setData(filmData);
        allFilms[filmData._id] = film;
        filmIds.push(filmData._id);
      });
      return {
        allFilms,
        filmIds,
        isFilmLoading: false
      };
    }
    case allActions.LOAD_ALL_FILMS_FAILURE: {
      return {
        ...filmsInitialState
      };
    }
    case allActions.MAKE_A_FILM_WATCHED_SUCCESS:
    case allActions.ADD_PERSONAL_NOTE_SUCCESS: {
      const film = action.payload as FilmModel;
      return {
        ...state,
        allFilms: {
          ...state.allFilms,
          [film.id]: film
        }
      };
    }
  }
  return state;
};
