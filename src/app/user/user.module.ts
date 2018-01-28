import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

import {SignupComponent} from './signup/signup.component';
import {ProfileEditComponent} from './profile-edit/profile-edit.component';
import {SigninComponent} from './signin/signin.component';
import {UserRoutingModule} from './user-routing.module';

// import { UpdateWatchlistComponent } from './update-watchlist/update-watchlist.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule
  ],
  declarations: [
    SignupComponent,
    ProfileEditComponent,
    SigninComponent,
    // UpdateWatchlistComponent
  ],
  exports: [
    SignupComponent,
    SigninComponent,
    ProfileEditComponent
  ],
  providers: []
})
export class UserModule {
}
