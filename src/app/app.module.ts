import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {NgRedux, NgReduxModule} from '@angular-redux/store';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import {SharedModule} from './shared/shared.module';
import {AppRoutingModule} from './app-routing.module';

import {AppComponent} from './app.component';
import {HeaderComponent} from './layout/header/header.component';
import {FooterComponent} from './layout/footer/footer.component';
import {AboutComponent} from './about/about.component';
import {PageNotFoundComponent} from './page-not-found/page-not-found.component';
import {HomeComponent} from './home/home.component';

import {AuthEpics} from './redux-store/auth/auth-epics';
import {FilmEpics} from './redux-store/films/film-epics';
import {RootEpic} from './redux-store/root-epic';
import {AuthService} from './shared/auth/auth.service';
import {appInitialState, rootReducer} from './redux-store/root-reducer';
import {IAppState} from './redux-store/data-models/interfaces';
import {UserModule} from './user/user.module';
import {AlertComponent} from './alert/alert.component';
import {AddHeaderInterceptor} from './shared/auth/add-header.service';
import {UserService} from './shared/auth/user.service';
import {RedirectIfLoggedin} from './shared/auth/redirect-if-loggedin';
import {AuthGuardService} from './shared/auth/auth-guard.service';
import {FilmService} from './shared/films/film.service';
import { ContactMeComponent } from './layout/contact-me/contact-me.component';

// import {createLogger} from 'redux-logger';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    AlertComponent,
    AboutComponent,
    PageNotFoundComponent,
    HomeComponent,
    ContactMeComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    NgReduxModule,
    HttpClientModule,
    NgbModule.forRoot(),
    SharedModule,
    UserModule,
    AppRoutingModule
  ],
  providers: [
    AuthEpics,
    FilmEpics,
    RootEpic,
    AuthService,
    UserService,
    FilmService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AddHeaderInterceptor,
      multi: true,
    },
    AuthGuardService,
    RedirectIfLoggedin
  ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(public store: NgRedux<IAppState>, public rootEpic: RootEpic) {
    const middleware = [
      // createLogger(),
      this.rootEpic.getEpicMiddleware()
    ];
    store.configureStore(rootReducer, appInitialState, middleware);
  }
}
