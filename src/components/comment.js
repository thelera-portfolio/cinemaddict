import {formatDate, createElement} from "../utils.js";

const createCommentsTemplate = (comment) => {
  const {author, date, emotion, message} = comment;
  const {day, month, year, hours, minutes} = formatDate(date);
  const formattedDate = `${year}/${month}/${day} ${hours}:${minutes}`;

  return (
    `<li class="film-details__comment">
      <span class="film-details__comment-${emotion}">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${message}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${formattedDate}</span>
          <button class="film-details__comment-delete">Delete</button>
        </p>
      </div>
    </li>`
  );
};

export default class Comment {
  constructor(comment) {
    this._element = null;
    this._comment = comment;
  }

  getTemplate() {
    return createCommentsTemplate(this._comment);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
