import {IAuth} from '../data-models/interfaces';
import {AnyAction} from 'redux';
import * as allActions from '../all-actions';
import {UserModel} from '../data-models/UserModel';

export const authInitialState: IAuth = {
  isLoggedIn: false,
  authUser: null,
  isUserActionPending: false
};

export const authReducer = (state: IAuth = authInitialState, action: AnyAction): IAuth => {
  switch (action.type) {
    case allActions.PROFILE_UPDATE_START:
    case allActions.SIGNUP_START: {
      return {
        ...state,
        isUserActionPending: true
      };
    }
    case allActions.LOGIN_START: {
      return {
        ...authInitialState,
        isUserActionPending: true
      };
    }
    case allActions.PROFILE_UPDATE_SUCCESS:
    case allActions.LOGIN_SUCCESS_SILENT:
    case allActions.LOGIN_SUCCESS: {
      const authUser = new UserModel();
      authUser.setUserData(action.payload);
      return {
        isLoggedIn: true,
        authUser,
        isUserActionPending: false
      };
    }
    case allActions.LOGOUT:
    case allActions.TOKEN_EXPIRED:
    case allActions.LOGIN_FAILURE: {
      return {
        ...authInitialState
      };
    }
    case allActions.SIGNUP_SUCCESS:
    case allActions.PROFILE_UPDATE_FAILURE:
    case allActions.SIGNUP_FAILURE: {
      return {
        ...state,
        isUserActionPending: false
      };
    }
  }
  return state;
};
