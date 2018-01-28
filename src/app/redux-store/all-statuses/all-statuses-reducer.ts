import {IAllStatuses} from '../data-models/interfaces';
import {AnyAction} from 'redux';
import * as allActions from '../all-actions';

export const allStatusesInitialState: IAllStatuses = {
  isAjaxLoading: false,
  isFilmUpdating: false
};

export const allStatusesReducer = (state: IAllStatuses = allStatusesInitialState, action: AnyAction): IAllStatuses => {
  switch (action.type) {
    case allActions.LOAD_ALL_FILMS_START:
    case allActions.PROFILE_UPDATE_START:
    case allActions.SIGNUP_START:
    case allActions.LOGIN_START: {
      return {
        ...state,
        isAjaxLoading: true
      };
    }
    case allActions.LOAD_ALL_FILMS_SUCCESS:
    case allActions.LOAD_ALL_FILMS_FAILURE:
    case allActions.PROFILE_UPDATE_SUCCESS:
    case allActions.PROFILE_UPDATE_FAILURE:
    case allActions.SIGNUP_SUCCESS:
    case allActions.SIGNUP_FAILURE:
    case allActions.LOGIN_SUCCESS:
    case allActions.LOGIN_SUCCESS_SILENT:
    case allActions.LOGIN_FAILURE: {
      return {
        ...state,
        isAjaxLoading: false
      };
    }
    case allActions.ADD_PERSONAL_NOTE_START:
    case allActions.MAKE_A_FILM_WATCHED_START: {
      return {
        ...state,
        isFilmUpdating: true
      };
    }
    case allActions.ADD_PERSONAL_NOTE_SUCCESS:
    case allActions.ADD_PERSONAL_NOTE_FAILURE:
    case allActions.MAKE_A_FILM_WATCHED_SUCCESS:
    case allActions.MAKE_A_FILM_WATCHED_FAILURE: {
      return {
        ...state,
        isFilmUpdating: false
      };
    }
  }
  return state;
};
