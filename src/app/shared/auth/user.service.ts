import {Injectable} from '@angular/core';

import {AuthActions} from '../../redux-store/auth/auth-actions';
import {UserModel} from '../../redux-store/data-models/UserModel';
import {NgRedux} from '@angular-redux/store';
import {IAppState} from '../../redux-store/data-models/interfaces';

@Injectable()
export class UserService {

  constructor(private ngRedux: NgRedux<IAppState>) {
  }
  signUp(userToSignup: UserModel) {
    return this.ngRedux.dispatch(AuthActions.signupStartAction(userToSignup));
  }
  update(userToUpdate: UserModel) {
    return this.ngRedux.dispatch(AuthActions.profileUpdateStartAction(userToUpdate));
  }
  signIn(email: string, password: string) {
    return this.ngRedux.dispatch(AuthActions.loginAction({email, password}));
  }
}
