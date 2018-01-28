import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {FilmModel} from '../../redux-store/data-models/FilmModel';

@Component({
  selector: 'app-film',
  templateUrl: './film.component.html',
  styleUrls: ['./film.component.css']
})
export class FilmComponent implements OnInit {
  @Input() isFilmUpdating: boolean;
  @Input() isLoggedIn: boolean;
  @Input() film: FilmModel;
  @Output() makeWatchEvent = new EventEmitter<string>();
  @Output() showModalEvent = new EventEmitter<string>();
  isWatchedClicked = false;
  constructor() {
  }

  ngOnInit() {
  }
  makeItWatched() {
    this.makeWatchEvent.emit(this.film.id);
    this.isWatchedClicked = true;
  }
  showModel() {
    this.showModalEvent.emit(this.film.id);
  }
}
