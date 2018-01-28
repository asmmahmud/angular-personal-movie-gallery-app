import * as allActions from '../all-actions';
import {AnyAction} from 'redux';
import {UserModel} from '../data-models/UserModel';
import {IProfileUpdateResponse} from '../data-models/interfaces';

export class AuthActions {

  static loginAction(credentials: { email: string, password: string }): AnyAction {
    if (window.localStorage.getItem('access_token')) {
      window.localStorage.removeItem('access_token');
      window.localStorage.removeItem('auth_user');
    }
    return {
      type: allActions.LOGIN_START,
      payload: credentials
    };
  }
  static loginSuccessSilent(payload): AnyAction {
    return ({
      type: allActions.LOGIN_SUCCESS_SILENT,
      payload,
    });
  }
  static loginSuccess(payload): AnyAction {
    return ({
      type: allActions.LOGIN_SUCCESS,
      payload,
    });
  }
  static loginFailureAction(errorMessage: string, errorStatus: string): AnyAction {
    return {
      type: allActions.LOGIN_FAILURE,
      payload: null,
      error: {errorMessage, errorStatus}
    };
  }
  static profileUpdateStartAction(profileData: UserModel): AnyAction {
    return {
      type: allActions.PROFILE_UPDATE_START,
      payload: profileData.toUpdate()
    };
  }
  static profileUpdateSuccessAction(updateResponse: IProfileUpdateResponse): AnyAction {
    return {
      type: allActions.PROFILE_UPDATE_SUCCESS,
      payload: updateResponse
    };
  }
  static profileUpdateFailureAction(errorMessage: string, errorStatus: string): AnyAction {
    return {
      type: allActions.PROFILE_UPDATE_FAILURE,
      payload: null,
      error: {errorMessage, errorStatus}
    };
  }
  static signupStartAction(signupData: UserModel): AnyAction {
    return {
      type: allActions.SIGNUP_START,
      payload: signupData.toSignup()
    };
  }
  static signupSuccessAction(): AnyAction {
    return {
      type: allActions.SIGNUP_SUCCESS
    };
  }
  static signupFailureAction(errorMessage: string, errorStatus: string): AnyAction {
    return {
      type: allActions.SIGNUP_FAILURE,
      payload: null,
      error: {errorMessage, errorStatus}
    };
  }
  static logoutAction(tokenExpired = false): AnyAction {
    if (window.localStorage.getItem('access_token')) {
      window.localStorage.removeItem('access_token');
      window.localStorage.removeItem('auth_user');
    }
    if (tokenExpired) {
      return {type: allActions.TOKEN_EXPIRED};
    }
    return {type: allActions.LOGOUT};
  }
}
