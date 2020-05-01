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

  removeComment(cardId, commentId) {
    const cardIndex = this._comments.findIndex((cardComments) => cardComments.id === cardId);
    const index = this._comments[cardIndex].findIndex((comment) => comment.id === commentId);

    if (index === -1 || cardIndex === -1) {
      return false;
    }

    this._comments[cardIndex] = [].concat(this._comments[cardIndex].slice(0, index), this._comments[cardIndex].slice(index + 1));
    this._comments[cardIndex].id = cardId;

    this._callHandlers(this._dataChangeHandlers);

    return true;
  }

  addComment(cardId, comment) {
    const cardIndex = this._comments.findIndex((cardComments) => cardComments.id === cardId);

    this._comments[cardIndex].push(comment);

    this._callHandlers(this._dataChangeHandlers);
  }

  // уведомление наблюдателей * notify *
  _callHandlers(handlers) {
    handlers.forEach((handler) => handler());
  }
}
