import {Injectable} from '@angular/core';
import {HttpClient, HttpErrorResponse, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {ActionsObservable} from 'redux-observable';
import {of} from 'rxjs/observable/of';
import {AnyAction} from 'redux';
import {Observable} from 'rxjs/Observable';
import '../../shared/rxjs-imports';
import {environment} from '../../../environments/environment';
import {AuthActions} from './auth-actions';
import * as allActions from '../all-actions';
import {IAuthResponse, IProfileUpdateResponse} from '../data-models/interfaces';
import {FilmActions} from '../films/film-actions';

@Injectable()
export class AuthEpics {
  private apiUrl = environment.apiServer;
  constructor(private http: HttpClient, private router: Router) {
  }
  allEpics() {
    return [
      this.loginActionEpic.bind(this),
      this.loginSuccessActionEpic.bind(this),
      this.signUpActionEpic.bind(this),
      this.profileUpdateActionEpic.bind(this)
    ];
  }
  loginActionEpic(action$: ActionsObservable<AnyAction>): Observable<AnyAction> {
    return action$.ofType(allActions.LOGIN_START)
      .mergeMap((action: AnyAction) => {
        return this.http.post<IAuthResponse>(`${this.apiUrl}/api/users/authenticate`, action.payload)
          .mergeMap((result: IAuthResponse) => {
            if (result && result.access_token && result.auth_user) {
              window.localStorage.setItem('auth_user', JSON.stringify(result.auth_user));
              window.localStorage.setItem('access_token', result.access_token);
              return this.router.navigate(['/profile-edit'])
                .then(() => AuthActions.loginSuccess(result.auth_user));
            }
            return of(AuthActions.loginFailureAction('Somehow! Auth Info was not received from the server.', 'Unauthorized'));
          })
          .catch((error: HttpErrorResponse) =>
            of(AuthActions.loginFailureAction(error.error.message, error.statusText)));
      });
  }
  loginSuccessActionEpic(action$: ActionsObservable<AnyAction>): Observable<AnyAction> {
    return action$.ofType(allActions.LOGIN_SUCCESS)
      .map(() => FilmActions.loadFilmsAsyncAction());
  }
  signUpActionEpic(action$: ActionsObservable<AnyAction>): Observable<AnyAction> {
    return action$.ofType(allActions.SIGNUP_START)
      .mergeMap((action: AnyAction) => {
        return this.http.post(`${this.apiUrl}/api/users/register`, action.payload)
          .mergeMap(() => {
            return this.router.navigate(['signin']).then(() => AuthActions.signupSuccessAction());
          })
          .catch((error: HttpErrorResponse) =>
            of(AuthActions.signupFailureAction(error.error.message, error.statusText)));
      });
  }
  profileUpdateActionEpic(action$: ActionsObservable<AnyAction>): Observable<AnyAction> {
    return action$.ofType(allActions.PROFILE_UPDATE_START)
      .mergeMap((action: AnyAction) => {
        return this.http.put<IProfileUpdateResponse>(
          `${this.apiUrl}/api/users/${action.payload.id}`, action.payload,
          {
            headers: new HttpHeaders().set('Authorization', `Bearer ${window.localStorage.getItem('access_token')}`)
          })
          .map((result: IProfileUpdateResponse) => {
            // console.log('updat response: ', result);
            window.localStorage.setItem('auth_user', JSON.stringify(result));
            return AuthActions.profileUpdateSuccessAction(result);
          })
          .catch((error: HttpErrorResponse) =>
            of(AuthActions.profileUpdateFailureAction(error.error.message, error.statusText)));
      });
  }
}
