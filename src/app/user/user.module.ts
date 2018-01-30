import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {ReactiveFormsModule} from '@angular/forms';

import {SignupComponent} from './signup/signup.component';
import {ProfileEditComponent} from './profile-edit/profile-edit.component';
import {SigninComponent} from './signin/signin.component';
import {UserRoutingModule} from './user-routing.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    UserRoutingModule,
    SharedModule
  ],
  declarations: [
    SignupComponent,
    ProfileEditComponent,
    SigninComponent
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
