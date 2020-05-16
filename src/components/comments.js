import { humanizeDate } from "../utils/common.js";
import AbstractSmartComponent from "./abstract-smart-component.js";
import { encode } from "he";
import { Button } from "../utils/consts.js";

const createCommentsTemplate = (comments) => {
  const markUp = ``;
  comments.forEach((coment) => markUp.concat(createOneCommentTemplate(comment)));

  return markUp;
};

const createOneCommentTemplate = (comment) => {
  const {author, date, emotion, id, message: currentMessage} = comment;
  const formattedDate = humanizeDate(date);

  const message = encode(currentMessage);

  return (
    `<li data-id="${id}" class="film-details__comment">
      <span class="film-details__comment-${emotion}">
        <img src="./images/emoji/${emotion}.png" width="55" height="55" alt="emoji-smile">
      </span>
      <div>
        <p class="film-details__comment-text">${message}</p>
        <p class="film-details__comment-info">
          <span class="film-details__comment-author">${author}</span>
          <span class="film-details__comment-day">${formattedDate}</span>
          <button data-id="${id}" class="film-details__comment-delete"}>Delete</button>
        </p>
      </div>
    </li>`
  );
};

export default class Comments extends AbstractSmartComponent {
  constructor(commentsModel) {
    super();
    this._comments = commentsModel;
  }

  getTemplate() {
    return createCommentsTemplate(this._comments.getComments());
  }
}
