import {IUserPostData} from './interfaces';

export class UserModel {
  public id = '';
  public first_name = '';
  public last_name = '';
  public email = '';
  public thumb_path?: string;
  private password?: string;

  setUserData(userData: any) {
    this.id = userData.id ? userData.id : '';
    this.first_name = userData.first_name;
    this.last_name = userData.last_name;
    this.email = userData.email;
    this.thumb_path = userData.thumb_path ? userData.thumb_path : '';
    this.password = userData.password ? userData.password : '';
  }
  toSignup(): IUserPostData {
    return {
      first_name: this.first_name,
      last_name: this.last_name,
      email: this.email,
      password: this.password,
      thumb_path: this.thumb_path
    };
  }
  toUpdate(): IUserPostData {
    const postData: IUserPostData = {
      id: this.id,
      first_name: this.first_name,
      last_name: this.last_name,
      thumb_path: this.thumb_path
    };
    if (this.password) {
      postData.password = this.password;
    }
    return postData;
  }
}
