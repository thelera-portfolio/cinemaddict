import Comment from "../models/comment.js";
import Movie from "../models/movie.js";
import {nanoid} from "nanoid";

const isOnline = () => {
  return window.navigator.onLine;
};

const getSyncedFilms = (items) => {
  return items.filter(({success}) => success)
    .map(({payload}) => payload.movie);
};

const createStoreStructure = (items) => {
  return items.reduce((acc, current) => {
    return Object.assign({}, acc, {
      [current.id]: current,
    });
  }, {});
};

export default class Provider {
  constructor(api, filmsStore, commentsStore) {
    this._api = api;
    this._filmsStore = filmsStore;
    this._commentsStore = commentsStore;
  }

  getFilms() {
    if (isOnline()) {
      return this._api.getFilms()
        .then((films) => {
          const filmsById = films.reduce((acc, film) => {
            return Object.assign({}, acc, {[film.id]: film.toRAW()});
          }, {})

          this._filmsStore.setItems(filmsById);

          return films;
        })
    }

    const storeFilms = Object.values(this._filmsStore.getItems());

    return Promise.resolve(Movie.parseMovies(storeFilms));
  }

  getComments(id) {
    if (isOnline()) {
      return this._api.getComments(id)
        .then((comments) => {
          let commentsByFilmId = comments.reduce((acc, comment) => {
            return Object.assign({}, acc, {[comment.id]: comment.toRAW()})
          }, {});

          this._commentsStore.setItem(id, commentsByFilmId);

          return comments;
        })
    }

    const storeCommentsById = Object.values(this._commentsStore.getItem(id));

    return Promise.resolve(Comment.parseComments(storeCommentsById));
  }

  updateFilm(id, film) {
    if (isOnline()) {
      return this._api.updateFilm(id, film)
        .then((newFilm) => {
          this._filmsStore.setItem(newFilm.id, newFilm.toRAW());

          return newFilm;
        })
    }

    const localFilm = Movie.clone(Object.assign(film, {id}));

    this._filmsStore.setItem(id, localFilm.toRAW());

    return Promise.resolve(localFilm);
  }

  addComment(id, comment) {
    if (isOnline()) {
      return this._api.addComment(id, comment)
        .then((newComment) => {
          let commentsByFilmId = this._commentsStore.getItems()[id];

          const storeCommentsByFilmId = Object.assign({}, commentsByFilmId, {[newComment.id]: newComment.toRAW()});
          this._commentsStore.setItem(id, storeCommentsByFilmId);

          return newComment;
        });
    }

    const localNewCommentID = nanoid();
    let localCommentsByFilmId = this._commentsStore.getItems()[id];

    Object.assign(localCommentsByFilmId, { [localNewCommentID]: comment.toRAW() });
    this._commentsStore.setItem(id, localCommentsByFilmId);

    return Promise.resolve(Comment.parseComments(Object.values(localCommentsByFilmId)));
  }

  deleteComment(id, filmId) {
    if (isOnline()) {
      return this._api.deleteComment(id)
        .then(this._commentsStore.deleteItem(id, filmId));
    }

    this._commentsStore.deleteItem(id, filmId);

    return Promise.resolve();
  }

  sync() {
    if (isOnline()) {
      const storeFilms = Object.values(this._filmsStore.getItems());

      return this._api.sync(storeFilms)
        .then((response) => {
          const undatedFilms = getSyncedFilms(response.updated);
          this._filmsStore.setItems(createStoreStructure(undatedFilms));
        });
    }

    return Promise.reject(new Error(`Sync data failed`));
  }
}