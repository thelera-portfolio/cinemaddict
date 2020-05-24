export default class Movie {
  constructor(film) {
    this.actors = film.film_info[`actors`];
    this.age = film.film_info[`age_rating`];
    this.commentsIds = film[`comments`];
    this.controls = {
      isAddedToWatchlist: film.user_details[`watchlist`],
      isWatched: film.user_details[`already_watched`],
      isFavourite: film.user_details[`favorite`],
    };
    this.country = film.film_info.release[`release_country`];
    this.description = film.film_info[`description`];
    this.director = film.film_info[`director`];
    this.duration = film.film_info[`runtime`];
    this.genres = film.film_info[`genre`];
    this.id = film[`id`];
    this.image = film.film_info[`poster`];
    this.originalTitle = film.film_info[`alternative_title`];
    this.title = film.film_info[`title`];
    this.rating = film.film_info[`total_rating`];
    this.releaseDate = film.film_info.release[`date`];
    this.writers = film.film_info[`writers`];
    this.watchingDate = film.user_details[`watching_date`];
  }

  toRAW() {
    return {
      "id": this.id,
      "film_info": {
        "title": this.title,
        "alternative_title": this.originalTitle,
        "total_rating": this.rating,
        "poster": this.image,
        "age_rating": this.age,
        "director": this.director,
        "writers": this.writers,
        "actors": this.actors,
        "release": {
          "date": this.releaseDate,
          "release_country": this.country,
        },
        "runtime": this.duration,
        "genre": this.genres,
        "description": this.description,
      },
      "user_details": {
        "watchlist": this.controls.isAddedToWatchlist,
        "already_watched": this.controls.isWatched,
        "watching_date": this.watchingDate,
        "favorite": this.controls.isFavourite,
      },
      "comments": this.commentsIds,
    };
  }

  static clone(film) {
    return new Movie(film.toRAW());
  }

  static parseMovie(film) {
    return new Movie(film);
  }

  static parseMovies(films) {
    return films.map(Movie.parseMovie);
  }
}
