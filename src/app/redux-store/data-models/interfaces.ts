import {UserModel} from './UserModel';
import {FilmModel} from './FilmModel';

export interface IAppState {
  allStatuses: IAllStatuses;
  alert: IAlert;
  auth: IAuth;
  films: IFilmState;
}

export interface IAuth {
  authUser: UserModel | null;
  isLoggedIn: boolean;
  isLoginPending: boolean;
}

export interface IFilmState {
  allFilms: IAllFilms;
  filmIds: Array<string>;
  isFilmLoading: boolean;
}

export interface IAllFilms {
  [key: string]: FilmModel;
}

export interface IFilmPagination {
  filmsToShow: Array<FilmModel>;
  genre: string;
  searchTerm: string;
  sortCriteria: string;
  sortingOrder: string;
  currentPage: number;
  totalItems: number;
}

export interface IQueryParams {
  genre?: string;
  q?: string;
  p?: number;
  sort?: string;
  dir?: string;
}

export interface IAuthResponse {
  auth_user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    thumb_path?: string;
  };
  access_token: string;
}

export interface IProfileUpdateResponse {
  auth_user: {
    id: string;
    email: string;
    first_name: string;
    last_name: string;
    thumb_path?: string;
    role: string;
    created_at: string;
  };
  access_token: string;
}

export interface IUserPostData {
  id?: string;
  email?: string;
  first_name: string;
  last_name: string;
  password?: string;
  thumb_path?: string;
}

export interface IAlert {
  message: string;
  messageType: string;
}

export interface IAllStatuses {
  isAjaxLoading: boolean;
  isFilmUpdating: boolean;
}
