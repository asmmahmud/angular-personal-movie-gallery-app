import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import {UserService} from '../../shared/auth/user.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent {
  signinForm: FormGroup;
  showLoader = false;

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
    console.log(this.signinForm.value);
    this.showLoader = true;
    this.userService.signIn(this.signinForm.value.email, this.signinForm.value.password);
  }
}
