import {IAllFilms} from './interfaces';
import {FilmModel} from './FilmModel';

export class CurrentFilmsList {
  allFilms: IAllFilms = {};
  filmIds: Array<string> = [];
  genre = '';
  searchTerm = '';
  sortCriteria = 'release_year';
  sortingOrder = 1; // positive for descending and negative for ascending
  isSortingNeeded = true;
  setAllFilms(allFilms: IAllFilms) {
    this.allFilms = allFilms;
    // this.filmIds = Object.keys(allFilms);
    // this.sortTheList();
  }
  getFilms(start, end) {
    const filmsToShow: Array<FilmModel> = [];
    for (let index = start; index < end; index++) {
      if (this.filmIds[index]) {
        filmsToShow.push(this.allFilms[this.filmIds[index]]);
      }
    }
    return filmsToShow;
  }
  setAllProperties(genre, searchTerm, sortCriteria, sortingOrder) {
    if (genre !== null) {
      const genreStr = genre.replace(/\s+/g, ' ');
      this.genre = genreStr.toLowerCase();
    }
    if (searchTerm !== null) {
      const queryStr = searchTerm.replace(/\s+/g, ' ');
      this.searchTerm = queryStr.toLowerCase();
    }
    if (sortCriteria !== null) {
      this.sortCriteria = sortCriteria;
    }
    if (sortingOrder !== null) {
      this.sortingOrder = sortingOrder;
    }

    // console.log('setAllProperties 2: ', this.genre, this.searchTerm, this.sortCriteria, this.sortingOrder);
  }
  setSortCriteria(newCriteria: string) {
    this.sortCriteria = newCriteria;
    this.isSortingNeeded = true;
    this.sortTheList();
  }
  setSortingOrder(newSortingOrder: number) {
    this.sortingOrder = newSortingOrder;
    this.isSortingNeeded = true;
    this.sortTheList();
  }
  setNewSearchTerm(newSearchTerm: string) {
    const queryStr = newSearchTerm.replace(/\s+/g, ' ');
    this.searchTerm = queryStr.toLowerCase();
    this.applyFilters();
  }
  applyFilters() {
    let filmIds = Object.keys(this.allFilms);
    if (this.genre) {
      filmIds = filmIds.filter((filmId: string) => {
        return this.allFilms[filmId].searchByProp('genres', this.genre);
      });
    }
    if (this.searchTerm) {
      filmIds = filmIds.filter((filmId: string) => {
        return this.allFilms[filmId].searchAllProp(this.searchTerm);
      });
    }
    this.filmIds = filmIds;
    // console.log('apply filter: ', this.filmIds);
    // console.log(this.filmIds);
    this.isSortingNeeded = true;
    this.sortTheList();
  }
  sortTheList() {
    if (!this.isSortingNeeded) {
      return;
    }
    this.filmIds.sort((idA, idB) => {
      if (this.allFilms[idA][this.sortCriteria] < this.allFilms[idB][this.sortCriteria]) {
        return this.sortingOrder < 0 ? -1 : 1;
      }
      if (this.allFilms[idA][this.sortCriteria] > this.allFilms[idB][this.sortCriteria]) {
        return this.sortingOrder < 0 ? 1 : -1;
      }
      if (this.allFilms[idA][this.sortCriteria] === this.allFilms[idB][this.sortCriteria] && this.sortCriteria !== 'title') {
        if (this.allFilms[idA]['title'] < this.allFilms[idB]['title']) {
          return -1;
        }
        if (this.allFilms[idA]['title'] > this.allFilms[idB]['title']) {
          return 1;
        }
      }
      return 0;
    });
    this.isSortingNeeded = false;
  }

}
