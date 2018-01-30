import {Component} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import '../../shared/rxjs-imports';

import {UserService} from '../../shared/auth/user.service';
import {UserModel} from '../../redux-store/data-models/UserModel';
import {Observable} from 'rxjs/Observable';
import {select} from '@angular-redux/store';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styles: [``]
})
export class SignupComponent {
  signupForm: FormGroup;
  @select(['auth', 'isUserActionPending']) isUserActionPending$: Observable<boolean>;
  static passwordConfirming(controlName: AbstractControl): { 'notSame': boolean } {
    if (controlName.get('password').value !== controlName.get('password_confirm').value) {
      return {'notSame': true};
    }
    return null;
  }
  constructor(private fb: FormBuilder, private userService: UserService) {
    this.createForm();
  }
  createForm() {
    this.signupForm = this.fb.group({
      'first_name': ['', [Validators.required, Validators.minLength(3)]],
      'last_name': ['', [Validators.required, Validators.minLength(3)]],
      'email': ['', [Validators.email]],
      'passwords': this.fb.group({
          'password': ['', [Validators.required, Validators.minLength(4)]],
          'password_confirm': ''
        },
        {validator: SignupComponent.passwordConfirming}
      ),
      'thumb_path': ['', [Validators.pattern('.+?\.(jpg|jpg|png)')]]
    });
  }
  isValid(elemName: string) {
    return this.signupForm.get(elemName).invalid && !this.signupForm.get(elemName).untouched &&
      (this.signupForm.get(elemName).dirty || this.signupForm.get(elemName).touched);
  }
  isShow(elemPath: string[], validationName: string) {
    return this.signupForm.hasError(validationName, elemPath);
  }
  onSignUp() {
    const newUser = new UserModel();
    newUser.setUserData({
      first_name: this.signupForm.value.first_name,
      last_name: this.signupForm.value.last_name,
      email: this.signupForm.value.email,
      password: this.signupForm.value.passwords && this.signupForm.value.passwords.password ?
        this.signupForm.value.passwords.password : '',
      thumb_path: this.signupForm.value.thumb_path ? this.signupForm.value.thumb_path : ''
    });
    this.userService.signUp(newUser);
  }
}
