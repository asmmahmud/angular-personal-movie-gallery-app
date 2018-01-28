import {IAlert} from '../data-models/interfaces';
import {AnyAction} from 'redux';
import * as allActions from '../all-actions';

export const alertInitialState: IAlert = {
  message: '',
  messageType: ''
};

export const alertReducer = (state: IAlert = alertInitialState, action: AnyAction): IAlert => {
  switch (action.type) {
    case allActions.SHOW_ALERT: {
      return {
        message: action.payload.message,
        messageType: action.payload.messageType
      };
    }
    case allActions.PROFILE_UPDATE_SUCCESS: {
      return {
        message:  'Your profile has been successfully updated.',
        messageType: 'success'
      };
    }
    case allActions.SIGNUP_SUCCESS: {
      return {
        message:  'User has been successfully signed up.',
        messageType: 'success'
      };
    }
    case allActions.LOGIN_SUCCESS: {
      return {
        message:  'You are successfully logged in.',
        messageType: 'success'
      };
    }
    case allActions.LOGOUT: {
      return {
        message:  'You are logged out.',
        messageType: 'warning'
      };
    }
    case allActions.TOKEN_EXPIRED: {
      return {
        message:  'You are logged out (Session expired).',
        messageType: 'warning'
      };
    }
    case allActions.MAKE_A_FILM_WATCHED_FAILURE:
    case allActions.ADD_PERSONAL_NOTE_FAILURE:
    case allActions.LOAD_ALL_FILMS_FAILURE:
    case allActions.PROFILE_UPDATE_FAILURE:
    case allActions.SIGNUP_FAILURE:
    case allActions.LOGIN_FAILURE: {
      return {
        message:  action.error.errorStatus + ' : ' + action.error.errorMessage,
        messageType: 'danger'
      };
    }
    case allActions.CLOSE_ALERT: {
      return {...alertInitialState};
    }
  }
  return state;
};

