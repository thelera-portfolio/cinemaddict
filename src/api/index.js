import Movie from "../models/movie.js";
import Comment from "../models/comment.js";
import LocalComment from "../models/local-comment.js";
import {checkStatus} from "../utils/common.js";
import {Method, Url} from "../utils/consts.js";

export default class API {
  constructor(authorization, endPoint) {
    this._authorization = authorization;
    this._endPoint = endPoint;
  }

  addComment(id, comment) {
    return this._load({
      url: `${Url.COMMENTS}/${id}`,
      method: Method.POST,
      body: JSON.stringify(comment.toRAW()),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json())
      .then(LocalComment.parseComment)
      .then((film) => film.comments);
  }

  removeComment(id) {
    return this._load({
      url: `${Url.COMMENTS}/${id}`,
      method: Method.DELETE,
    });
  }

  getFilms() {
    return this._load({url: Url.MOVIES})
      .then((response) => response.json())
      .then(Movie.parseMovies);
  }

  getComments(id) {
    return this._load({url: `${Url.COMMENTS}/${id}`})
      .then((response) => response.json())
      .then(Comment.parseComments);
  }

  sync(films) {
    return this._load({
      url: `${Url.MOVIES}/sync`,
      method: Method.POST,
      body: JSON.stringify(films),
      headers: new Headers({"Content-Type": `application/json`}),
    })
      .then((response) => response.json());
  }

  updateFilm(id, film) {
    return this._load({
      url: `${Url.MOVIES}/${id}`,
      method: Method.PUT,
      body: JSON.stringify(film.toRAW()),
      headers: new Headers({"Content-Type": `application/json`})
    })
      .then((response) => response.json())
      .then(Movie.parseMovie);
  }

  _load({url, method = Method.GET, body = null, headers = new Headers()}) {
    headers.append(`Authorization`, this._authorization);

    return fetch(`${this._endPoint}/${url}`, {method, body, headers})
      .then(checkStatus)
      .catch((err) => {
        throw err;
      });
  }
}
