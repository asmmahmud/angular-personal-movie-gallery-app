import {Injectable} from '@angular/core';
import {combineEpics, createEpicMiddleware} from 'redux-observable';
import {AuthEpics} from './auth/auth-epics';
import {FilmEpics} from './films/film-epics';

@Injectable()
export class RootEpic {

  constructor(private authEpics: AuthEpics, private filmEpics: FilmEpics) {
  }

  getEpicMiddleware() {
    return createEpicMiddleware(this.combineAllEpics());
  }
  combineAllEpics() {
    return combineEpics(
      ...this.authEpics.allEpics(),
      ...this.filmEpics.allEpics()
    );
  }
}
