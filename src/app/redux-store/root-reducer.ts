import {combineReducers, Reducer} from 'redux';
import {IAppState} from './data-models/interfaces';
import {authInitialState, authReducer} from './auth/auth-reducer';
import {alertInitialState, alertReducer} from './alert/alert-reducer';
import {allStatusesInitialState, allStatusesReducer} from './all-statuses/all-statuses-reducer';
import {filmsInitialState, filmReducer} from './films/film-reducer';

export const appInitialState: IAppState = {
  allStatuses: allStatusesInitialState,
  alert: alertInitialState,
  auth: authInitialState,
  films: filmsInitialState
};
export const rootReducer: Reducer<IAppState> = combineReducers({
  allStatuses: allStatusesReducer,
  alert: alertReducer,
  auth: authReducer,
  films: filmReducer
});
