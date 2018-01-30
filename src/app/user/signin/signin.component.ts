import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {select} from '@angular-redux/store';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {UserService} from '../../shared/auth/user.service';
import {Observable} from 'rxjs/Observable';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styles: [``]
})
export class SigninComponent {
  signinForm: FormGroup;
  showLoader = false;
  @select(['auth', 'isUserActionPending']) isUserActionPending$: Observable<boolean>;
  constructor(private fb: FormBuilder, private userService: UserService) {
    this.createForm();
  }

  createForm() {
    this.signinForm = this.fb.group({
      'email': ['', [Validators.email]],
      'password': ['', [Validators.required]]
    });
  }

  isValid(elemName: string) {
    return this.signinForm.get(elemName).invalid
      && !this.signinForm.get(elemName).untouched
      && (this.signinForm.get(elemName).dirty || this.signinForm.get(elemName).touched);
  }

  isShow(elemPath: string[], validationName: string) {
    return this.signinForm.hasError(validationName, elemPath);
  }

  onSignIn() {
    // console.log(this.signinForm.value);
    this.showLoader = true;
    this.userService.signIn(this.signinForm.value.email, this.signinForm.value.password);
  }
}
