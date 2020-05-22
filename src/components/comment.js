import AbstractComponent from "./abstract-component.js";
import {Button} from "../utils/consts.js";
import {humanizeDate} from "../utils/common.js";
import {encode} from "he";

const createCommentsTemplate = (comment, isDeletingButton) => {
  const {author, date, emotion, id, message: currentMessage} = comment;
  const formattedDate = humanizeDate(date);

  const message = encode(currentMessage);

  const buttonText = isDeletingButton ? Button.DELETING : Button.DELETE;

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
          <button data-id="${id}" class="film-details__comment-delete">${buttonText}</button>
        </p>
      </div>
    </li>`
  );
};

export default class Comment extends AbstractComponent {
  constructor(comment, isDeletingButton) {
    super();

    this._comment = comment;
    this._isDeletingButton = isDeletingButton;
  }

  getTemplate() {
    return createCommentsTemplate(this._comment, this._isDeletingButton);
  }
}
