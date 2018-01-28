import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {NgbActiveModal} from '@ng-bootstrap/ng-bootstrap';
import {FilmModel} from '../../redux-store/data-models/FilmModel';
import {FilmService} from '../../shared/films/film.service';
import {Observable} from 'rxjs/Observable';
import {NgRedux, select} from '@angular-redux/store';
import {Subscription} from 'rxjs/Subscription';
import {IAppState} from '../../redux-store/data-models/interfaces';

@Component({
  selector: 'app-film-detail',
  template: `
    <div class="modal-header">
      <h5 class="modal-title" id="exampleModalLabel">
        {{film?.title}}
      </h5>
      <button type="button" class="close" (click)="activeModal.close('Close click')">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div class="modal-body">
      <div class="card">
        <div class="card-body">
          <table class="table">
            <tr>
              <td class="label-col">Title</td>
              <td class="value-col"><h5>{{film?.title}}</h5></td>
            </tr>
            <tr>
              <td class="label-col">Release Date</td>
              <td class="value-col">{{film?.release_year}}</td>
            </tr>
            <tr>
              <td class="label-col">Run Time</td>
              <td class="value-col">{{film?.runtime_str}}</td>
            </tr>
            <tr>
              <td class="label-col">Language</td>
              <td class="value-col">{{film?.language}}</td>
            </tr>
            <tr *ngIf="film?.top_250">
              <td class="label-col">Position in Imdb Top 250</td>
              <td class="value-col">
                <span class="film-badge">{{film?.top_250}}</span>
              </td>
            </tr>
            <tr>
              <td class="label-col">Genres</td>
              <td class="value-col">{{film?.genres.join(' | ')}}</td>
            </tr>
            <tr>
              <td class="label-col">Director</td>
              <td class="value-col">{{film?.director.join(' | ')}}</td>
            </tr>
            <tr>
              <td class="label-col">Casts</td>
              <td class="value-col">{{film?.casts.join(' | ')}}</td>
            </tr>
            <tr *ngIf="film?.authUserWatched">
              <td class="label-col">Watch Status</td>
              <td class="value-col"><span class="film-badge">Watched</span></td>
            </tr>
            <tr *ngIf="film?.personalNote">
              <td class="label-col">Personal Note</td>
              <td class="value-col">{{film?.personalNote}}</td>
            </tr>
            <tr *ngIf="film?.authUserWatched && !film?.personalNote">
              <td class="label-col">Add a Personal Note</td>
              <td class="value-col">
                <div class="form-group">
                  <textarea class="form-control" rows="7" #personalNote></textarea>
                </div>
                <div class="form-group">
                  <img src="assets/ajax_loader_gray_128.gif" width="24" *ngIf="isFilmUpdating$ | async"/>
                  <button *ngIf="!(isFilmUpdating$ | async)"
                          class="btn btn-outline-primary" (click)="addPersonalNote(personalNote)">Add
                  </button>
                </div>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-secondary" (click)="activeModal.close('Close click')">Close</button>
    </div>
  `,
  styles: [`
    .table {
      margin: 0;
    }
    .table tr td {
      text-align: left;
      padding: 5px;
    }
    .table tr td.label-col {
      width: 20%;
    }
    .value-col {
      text-transform: capitalize;
    }
  `]
})
export class FilmDetailComponent implements OnInit, OnDestroy {
  @Input() filmId: string;
  @select(['allStatuses', 'isFilmUpdating']) isFilmUpdating$: Observable<boolean>;
  film$: Observable<FilmModel | null>;
  film: FilmModel;
  subscriptions: Subscription;
  constructor(public activeModal: NgbActiveModal,
              private filmService: FilmService,
              private ngRedux: NgRedux<IAppState>) {
  }

  ngOnInit() {
    this.film$ = this.ngRedux.select((rootState: IAppState) => {
      if (this.filmId) {
        return rootState.films.allFilms[this.filmId];
      }
      return null;
    });
    this.subscriptions = this.film$.subscribe((film: FilmModel | null) => {
      if (film && film.id) {
        this.film = film;
      }
    });
    console.log('FilmDetailComponent: init');
  }
  addPersonalNote(personalNote: HTMLTextAreaElement) {
    if (personalNote.value.length > 0) {
      this.filmService.addPersonalNote(this.film.id, personalNote.value);
/*      setTimeout(() => {
        this.film.personalNote = personalNote.value;
      }, 50);*/
    }
  }

  ngOnDestroy() {
    if (this.subscriptions) {
      this.subscriptions.unsubscribe();
    }
    console.log('FilmDetailComponent: destroy');
  }
}
