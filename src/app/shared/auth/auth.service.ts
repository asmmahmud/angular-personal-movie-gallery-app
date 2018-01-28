import {Injectable} from '@angular/core';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../../redux-store/data-models/interfaces';
import {AuthActions} from '../../redux-store/auth/auth-actions';

@Injectable()
export class AuthService {
  constructor(private ngRedux: NgRedux<IAppState>) {
  }
  static getToken() {
    return window.localStorage.getItem('access_token');
  }
  static getAuthUser() {
    return window.localStorage.getItem('auth_user');
  }
  static parseJwt(token) {
    const base64Url = token.split('.')[1];
    const base64 = base64Url.replace('-', '+').replace('_', '/');
    return JSON.parse(window.atob(base64));
  }
  public checkAuthentication(): Promise<boolean> | boolean {
    const token = AuthService.getToken();
    if (token) {
      const decodedToken = AuthService.parseJwt(token);
      const currentTimeinSeconds = Math.round(Date.now() / 1000);
      // console.log(decodedToken, currentTimeinSeconds);
      if (decodedToken && +decodedToken.exp > currentTimeinSeconds) {
        return true;
      }
      this.ngRedux.dispatch(AuthActions.logoutAction(true));
    }
    return false;
  }
  public userSignOut() {
    this.ngRedux.dispatch(AuthActions.logoutAction());
  }
  public authCheckInitiate() {
    this.checkAuthentication();
    if (AuthService.getToken() && AuthService.getAuthUser()) {
      const authPayload = JSON.parse(AuthService.getAuthUser());
      if (authPayload && authPayload.email) {
        this.ngRedux.dispatch(AuthActions.loginSuccessSilent(authPayload));
      }
    }
  }

}
