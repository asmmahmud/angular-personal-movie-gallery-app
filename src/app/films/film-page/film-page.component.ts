import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, ParamMap} from '@angular/router';
import {select} from '@angular-redux/store';
import {IAllFilms} from '../../redux-store/data-models/interfaces';
import {Observable} from 'rxjs/Observable';
import {FilmModel} from '../../redux-store/data-models/FilmModel';
import {Subscription} from 'rxjs/Subscription';
import {environment} from '../../../environments/environment';
import {FilmService} from '../../shared/films/film.service';

@Component({
  selector: 'app-film-page',
  templateUrl: './film-page.component.html',
  styles: [`
    .table tr td {
      text-align: left;
      padding: 8px;
    }
    .table tr td.label-col {
      width: 20%;
    }
    table.inner-table tr td.label-col {
      width: 60%;
    }
    table.inner-table tr td.label-col.title-col {
      width: 30%;
    }
    table.inner-table tr:first-child td {
      border-top: 0 none;
    }
    table.inner-table tr td.value-col {
    }
    .table .value-col {
      text-transform: capitalize;
    }
    .personal-note-para {
      margin: 1rem auto;
    }
    .personal-note-para p {
      font-style: italic;
      padding: 0 .5rem 0;
      margin: 1rem 2rem;
      border-left: 5px solid rgba(50, 120, 50, .7);
    }
  `]
})
export class FilmPageComponent implements OnInit, OnDestroy {
  apiDomain: string;
  sub1: Subscription;
  film: FilmModel;
  @select(['films', 'allFilms']) allFilms$: Observable<IAllFilms>;
  @select(['auth', 'isLoggedIn']) isLoggedIn$: Observable<boolean>;
  @select(['allStatuses', 'isFilmUpdating']) isFilmUpdating$: Observable<boolean>;
  constructor(private route: ActivatedRoute, private filmService: FilmService) {
    this.apiDomain = environment.apiServer;
  }
  ngOnInit() {
    this.sub1 = this.route.paramMap.switchMap((params: ParamMap) => {
      const filmId = params.get('id');
      return this.allFilms$.map((allFilms: IAllFilms) => {
        return allFilms && allFilms[filmId] ? allFilms[filmId] : null;
      });
    }).subscribe((film: FilmModel) => {
      this.film = film;
    });
  }
  ngOnDestroy() {
    if (this.sub1) {
      this.sub1.unsubscribe();
    }
  }
  makeItWatched() {
    if (this.film && this.film.id) {
      this.filmService.makeAFilmWatched(this.film.id);
    }
  }
  addPersonalNote(personalNote: HTMLTextAreaElement) {
    if (personalNote.value.length > 0) {
      this.filmService.addPersonalNote(this.film.id, personalNote.value);
    }
  }
}
