import Movie from "./models/movie.js";
import Comment from "./models/comment.js";
import LocalComment from "./models/local-comment.js";
import {Method, StatusCode, Url} from "./utils/consts.js";

const checkStatus = (response) => {
  if (response.status >= StatusCode.SUCCESS && response.status < StatusCode.REDIRECTION) {
    return response;
  } else {
    throw new Error(`${response.status}: ${response.statusText}`);
  }
}

export default class API {
  constructor(authorization, endPoint) {
    this._authorization = authorization;
    this._endPoint = endPoint;
  }

  getFilms() {
    return this._load({url: Url.MOVIES})
      .then((response) => response.json())
    .then(Movie.parseMovies);
  }

  getComments(id) {
    return this._load({url: `${Url.COMMENTS}/${id}`})
      .then((response) => response.json())
      .then(Comment.parseComments)
      .then((comments) => Object.defineProperty(comments, `filmId`, {value: id}))
  }

  updateFilm(id, data) {
    return this._load({
      url: `${Url.MOVIES}/${id}`,
      method: Method.PUT,
      body: JSON.stringify(data.toRAW()),
      headers: new Headers({ "Content-Type": `application/json` })
    })
      .then((response) => response.json())
      .then(Movie.parseMovie);
  }

  addComment(id, data) {
    return this._load({
      url: `${Url.COMMENTS}/${id}`,
      method: Method.POST,
      body: JSON.stringify(data.toRAW()),
      headers: new Headers({ "Content-Type": `application/json` })
    })
      .then((response) => response.json())
      .then(LocalComment.parseComment);
  }

  deleteComment(id) {
    return this._load({
      url: `${Url.COMMENTS}/${id}`,
      method: Method.DELETE,
    })
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
