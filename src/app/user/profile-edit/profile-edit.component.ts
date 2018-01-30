import {Component, OnDestroy, OnInit} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  AbstractControl
} from '@angular/forms';
import {select} from '@angular-redux/store';
import {UserService} from '../../shared/auth/user.service';
import {UserModel} from '../../redux-store/data-models/UserModel';
import {Observable} from 'rxjs/Observable';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styles: [``]
})
export class ProfileEditComponent implements OnInit, OnDestroy {
  sub1: Subscription;
  user: UserModel;
  updateForm: FormGroup;
  @select(['auth', 'authUser']) authUser$: Observable<UserModel>;
  @select(['auth', 'isUserActionPending']) isUserActionPending$: Observable<boolean>;
  static passwordConfirming(controlName: AbstractControl): { 'notSame': boolean } {
    if (controlName.get('password').value !== controlName.get('password_confirm').value) {
      return {'notSame': true};
    }
    return null;
  }
  constructor(private fb: FormBuilder, private userService: UserService) {
  }
  ngOnInit() {
    this.sub1 = this.authUser$.subscribe((authUser: UserModel) => {
      this.user = authUser;
      this.createForm();
    });
  }
  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }
  createForm() {
    this.updateForm = this.fb.group({
      'first_name': [this.user && this.user.first_name ? this.user.first_name : '',
        [Validators.required, Validators.minLength(3)]],
      'last_name': [this.user && this.user.last_name ? this.user.last_name : '',
        [Validators.required, Validators.minLength(3)]],
      'email': {value: this.user && this.user.email ? this.user.email : '', disabled: true},
      'passwords': this.fb.group({
          'password': '',
          'password_confirm': ''
        },
        {validator: ProfileEditComponent.passwordConfirming}
      ),
      'thumb_path': [this.user && this.user.thumb_path ? this.user.thumb_path : '',
        [Validators.pattern('.+?\.(jpg|jpg|png)')]]
    });
  }
  isValid(elemName: string) {
    return this.updateForm.get(elemName).invalid && !this.updateForm.get(elemName).untouched &&
      (this.updateForm.get(elemName).dirty || this.updateForm.get(elemName).touched);
  }
  isShow(elemPath: string[], validationName: string) {
    return this.updateForm.hasError(validationName, elemPath);
  }
  onUpdate() {
    // console.log('Update Form: ', this.updateForm);
    const updatedUser = new UserModel();
    updatedUser.setUserData({
      id: this.user.id,
      first_name: this.updateForm.value.first_name,
      last_name: this.updateForm.value.last_name,
      email: this.user.email,
      password: this.updateForm.value.passwords && this.updateForm.value.passwords.password ?
        this.updateForm.value.passwords.password : '',
      thumb_path: this.updateForm.value.thumb_path ? this.updateForm.value.thumb_path : ''
    });
    this.userService.update(updatedUser);
  }
}
