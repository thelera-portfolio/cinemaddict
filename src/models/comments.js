export default class Comments {
  constructor() {
    this._comments = [];

    this._dataChangeHandlers = []; // массив для сбора наблюдателей * observers *
  }

  getComments() {
    return this._comments;
  }

  setComments(comments) {
    this._comments = comments;

    // уведомляем подписавшихся на обновления, что модель изменилась
    this._callHandlers(this._dataChangeHandlers);
  }

  // подписаться на обновление * addObserver *
  setDataChangeHandler(handler) {
    this._dataChangeHandlers.push(handler);
  }

  removeComment(comment) {
    const index = this._comments.findIndex((currentComment) => currentComment.id === comment.id);

    if (index === -1) {
      return false;
    }

    this._comments = [].concat(this._comments.slice(0, index), this._comments.slice(index + 1));

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  addComment(film, comment) {
    this._comments = [].concat(this._comments, comment);

    this._callHandlers(this._dataChangeHandlers);
  }

  // уведомление наблюдателей * notify *
  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
