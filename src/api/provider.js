import Movie from "../models/movie.js";
import {createStoreStructure, getSyncedFilms, isOnline} from "../utils/common.js";
import {ErrorMessage} from "../utils/consts.js";

export default class Provider {
  constructor(api, store) {
    this._api = api;
    this._store = store;
  }

  getFilms() {
    if (isOnline()) {
      return this._api.getFilms()
        .then((films) => {
          const filmsById = films.reduce((acc, film) => {
            return Object.assign({}, acc, {[film.id]: film.toRAW()});
          }, {});

          this._store.setItems(filmsById);

          return films;
        });
    }

    const storeFilms = Object.values(this._store.getItems());

    return Promise.resolve(Movie.parseMovies(storeFilms));
  }

  getComments(id) {
    return this._api.getComments(id);
  }

  updateFilm(id, film) {
    if (isOnline()) {
      return this._api.updateFilm(id, film)
        .then((newFilm) => {
          this._store.setItem(newFilm.id, newFilm.toRAW());

          return newFilm;
        });
    }

    const localFilm = Movie.clone(Object.assign(film, {id}));

    this._store.setItem(id, localFilm.toRAW());

    return Promise.resolve(localFilm);
  }

  addComment(id, comment) {
    return this._api.addComment(id, comment);
  }

  removeComment(id) {
    return this._api.removeComment(id);
  }

  sync() {
    if (isOnline()) {
      const storeFilms = Object.values(this._store.getItems());

      return this._api.sync(storeFilms)
        .then((response) => {
          const undatedFilms = getSyncedFilms(response.updated);
          this._store.setItems(createStoreStructure(undatedFilms));
        });
    }

    return Promise.reject(new Error(ErrorMessage.SYNCHRONIZATION));
  }
}
