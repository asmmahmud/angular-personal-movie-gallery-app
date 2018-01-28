import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';

import {ProfileEditComponent} from './profile-edit/profile-edit.component';
import {SignupComponent} from './signup/signup.component';
import {SigninComponent} from './signin/signin.component';
import {AuthGuardService} from '../shared/auth/auth-guard.service';
import {RedirectIfLoggedin} from '../shared/auth/redirect-if-loggedin';
// import {UpdateWatchlistComponent} from './update-watchlist/update-watchlist.component';

const routes: Routes = [
    { path: 'profile-edit', canActivate: [AuthGuardService], component: ProfileEditComponent},
    { path: 'signin', canActivate: [RedirectIfLoggedin], component: SigninComponent},
    { path: 'signup', canActivate: [RedirectIfLoggedin], component: SignupComponent},
    // { path: 'update-watchlist', canActivate: [AuthGuardService], component: UpdateWatchlistComponent}
];

@NgModule({
    imports: [
        RouterModule.forChild(routes)
    ],
    exports: [RouterModule],
    declarations: []
})
export class UserRoutingModule {
}
