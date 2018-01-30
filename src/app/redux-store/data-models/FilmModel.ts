export class FilmModel {
  static possibleGenres = ['action', 'adventure', 'animation', 'comedy', 'biography', 'drama', 'crime', 'fantasy',
    'music', 'history', 'horror', 'mystery', 'romance', 'sci-fi', 'thriller', 'western', 'war'];
  static queryProp = ['title', 'release_year', 'director', 'genres', 'casts', 'language'];
  static listOfSortingCriteria = ['title', 'release_year', 'imdb_rating', 'metacritic_rating', 'rottentomatoes_score'];
  id: string | null = null;
  title = '';
  release_year: number;
  language: string;
  runtime: number;
  runtime_str: string;
  top_250?: number;
  director: Array<string> = [];
  casts: Array<string> = [];
  genres: Array<string> = [];
  imdb_id = '';
  imdb_url = '';
  imdb_rating: number;
  rottentomatoes_score: number;
  metacritic_rating: number;
  poster = '';
  storyline = '';
  plot = '';
  likes = 0;
  isFilmWatchUpdating = false;
  authUserWatched = false;
  personalNote = '';
  static separateTheItems(rawVal: string): Array<string> {
    if (rawVal) {
      return rawVal.split(',').map(item => item.trim().toLowerCase());
    }
    return [];
  }
  setData(filmData: any) {
    this.id = null;
    if (filmData.id) {
      this.id = filmData.id;
    }
    if (filmData._id) {
      this.id = filmData._id;
    }
    this.title = filmData.title.toLowerCase();
    this.release_year = +filmData.release_year;
    this.language = filmData.language.toLowerCase();
    this.runtime = +filmData.runtime;
    this.runtime_str = filmData.runtime ? filmData.runtime + ' mins' : '';
    this.top_250 = filmData.top_250 ? +filmData.top_250 : null;
    this.imdb_id = filmData.imdb_id;
    this.imdb_url = filmData.imdb_url;
    this.imdb_rating = +filmData.imdb_rating.toFixed(2);
    this.metacritic_rating = filmData.metacritic_rating ? Math.round(+filmData.metacritic_rating) : null;
    this.rottentomatoes_score = filmData.rottentomatoes_score ? Math.round(+filmData.rottentomatoes_score) : null;
    this.poster = filmData.poster;
    this.storyline = filmData.storyline;
    this.plot = filmData.plot;
    if (Array.isArray(filmData.director)) {
      this.director = [...filmData.director];
    } else {
      this.director = FilmModel.separateTheItems(filmData.director.replace(/\s+/g, ' '));
    }
    if (Array.isArray(filmData.casts)) {
      this.casts = [...filmData.casts];
    } else {
      this.casts = FilmModel.separateTheItems(filmData.casts.replace(/\s+/g, ' '));
    }
    if (Array.isArray(filmData.genres)) {
      this.genres = [...filmData.genres];
    } else {
      this.genres = FilmModel.separateTheItems(filmData.genres.replace(/\s+/g, ' '));
    }
    // this.casts = FilmModel.separateTheItems(filmData.casts.replace(/\s+/g, ' '));
    // this.genres = FilmModel.separateTheItems(filmData.genres.replace(/\s+/g, ' '));

    this.likes = filmData.likes ? filmData.likes : 0;
    this.authUserWatched = filmData.authUserWatched ? filmData.authUserWatched : false;
    this.personalNote = filmData.personalNote ? filmData.personalNote : '';
    return this;
  }

  searchByProp(queryProp: string, queryStr: any) {

    if (queryProp === 'casts') {
      for (const actor of this.casts) {
        if (actor.includes(queryStr)) {
          return true;
        }
      }
    } else if (queryProp === 'genres') {
      for (const genre of this.genres) {
        if (genre.includes(queryStr)) {
          return true;
        }
      }
    } else if (queryProp === 'director') {
      for (const d of this.director) {
        if (d.includes(queryStr)) {
          return true;
        }
      }
    } else {
      if (this[queryProp] && typeof this[queryProp] === 'string' && this[queryProp].includes(queryStr)) {
        return true;
      } else if (this[queryProp] && typeof this[queryProp] === 'number' && this[queryProp] === +queryStr) {
        return true;
      }
    }
    return false;
  }
  searchAllProp(queryStr: string) {
    for (const prop of FilmModel.queryProp) {
      if (Array.isArray(this[prop])) {
        for (const propval of this[prop]) {
          if (propval.includes(queryStr)) {
            return true;
          }
        }
      } else {
        if (typeof this[prop] === 'number' && queryStr === ('' + this[prop])) {
          return true;
        } else if (typeof this[prop] === 'string' && this[prop].includes(queryStr)) {
          return true;
        }
      }
    }
    return false;
  }

}
