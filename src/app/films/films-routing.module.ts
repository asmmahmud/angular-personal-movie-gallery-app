import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {FilmsComponent} from './films.component';
import {FilmPageComponent} from './film-page/film-page.component';

const routes: Routes = [
  {path: '', component: FilmsComponent},
  {path: ':id', component: FilmPageComponent},
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule],
  declarations: []
})
export class FilmsRoutingModule {
}
