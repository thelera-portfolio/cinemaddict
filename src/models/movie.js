export default class Movie {
  constructor(data) {
    this.actors = data.film_info[`actors`];
    this.age = data.film_info[`age_rating`];
    this.country = data.film_info.release[`release_country`];
    this.description = data.film_info[`description`];
    this.director = data.film_info[`director`];
    this.duration = data.film_info[`runtime`];
    this.genres = data.film_info[`genre`];
    this.id = data[`id`];
    this.image = data.film_info[`poster`];
    this.originalTitle = data.film_info[`alternative_title`];
    this.title = data.film_info[`title`];
    this.rating = data.film_info[`total_rating`];
    this.releaseDate = data.film_info.release[`date`];
    this.writers = data.film_info[`writers`];
    this.watchingDate = data.user_details[`watching_date`];
    this.isAddedToWatchlist = data.user_details[`watchlist`];
    this.isWatched = data.user_details[`already_watched`];
    this.isFavourite = data.user_details[`favorite`];
    this.commentsIds = data[`comments`];
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
        "watchlist": this.isAddedToWatchlist,
        "already_watched": this.isWatched,
        "watching_date": this.watchingDate,
        "favorite": this.isFavourite,
      },
      "comments": this.commentsIds,
    };
  }

  static parseMovie(data) {
    return new Movie(data);
  }

  static parseMovies(data) {
    return data.map(Movie.parseMovie);
  }

  static clone(data) {
    return new Movie(data.toRAW());
  }
}
