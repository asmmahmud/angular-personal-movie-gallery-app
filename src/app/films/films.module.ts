import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FilmsComponent} from './films.component';
import {FilmDetailComponent} from './film-detail/film-detail.component';
import {FilmsRoutingModule} from './films-routing.module';
import { FilmComponent } from './film/film.component';
import { FilterBarComponent } from './filter-bar/filter-bar.component';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { FilmPageComponent } from './film-page/film-page.component';

@NgModule({
  imports: [
    CommonModule,
    NgbModule.forRoot(),
    FilmsRoutingModule
  ],
  declarations: [
    FilmsComponent,
    FilmDetailComponent,
    FilmComponent,
    FilterBarComponent,
    FilmPageComponent
  ],
  entryComponents: [
    FilmDetailComponent
  ]
})
export class FilmsModule {
}
