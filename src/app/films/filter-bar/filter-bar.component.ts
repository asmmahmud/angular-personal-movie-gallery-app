import {Component, EventEmitter, Input, Output} from '@angular/core';
import {FilmModel} from '../../redux-store/data-models/FilmModel';

@Component({
  selector: 'app-filter-bar',
  templateUrl: './filter-bar.component.html',
  styleUrls: ['./filter-bar.component.css']
})
export class FilterBarComponent {
  @Input() listOfPages: Array<number>;
  @Input() currentPage: number;
  @Input() searchTerm: string;
  @Input() sortCriteria: string;
  @Input() sortingOrder: string;
  @Output() pageChangeEvent = new EventEmitter<number>();
  @Output() sortingCriteriaChangeEvent = new EventEmitter<string>();
  @Output() sortingOrderChangeEvent = new EventEmitter<string>();
  @Output() searchTermChangeEvent = new EventEmitter<string>();
  listOfSoringCriteria = FilmModel.listOfSortingCriteria;

  criteriaChanged(dropDown: HTMLSelectElement) {
    const newCriteria = dropDown.value;
    this.sortingCriteriaChangeEvent.emit(newCriteria);
  }
  sortingOrderChanged(dropDown: HTMLSelectElement) {
    const newOrder = dropDown.value;
    this.sortingOrderChangeEvent.emit(newOrder);
  }
  searchTermChanged(elem: HTMLInputElement) {
    const newSearchTerm = elem.value;
    this.searchTermChangeEvent.emit(newSearchTerm);
  }
}
