import {fromMinutesToHours, shake} from "../utils/common.js";
import AbstractSmartComponent from "./abstract-smart-component.js";
import {Button, EMOTIONS, PopupButton, SHAKE_ANIMATION_TIMEOUT} from "../utils/consts.js";
import CommentsComponent from "../components/comment.js";
import CommentModel from "../models/local-comment.js";
import {encode} from "he";
import moment from "moment";

const createCommentsMarkup = (comments, deletingButtonId) => {
  let markUp = ``;

  for (let i = 0; i < comments.length; i++) {
    const isDeletingButtonId = deletingButtonId === comments[i].id;
    markUp = markUp.concat(new CommentsComponent(comments[i], isDeletingButtonId).getTemplate());
  }

  return markUp;
};

const createButtonMarkup = (name, label, isChecked) => {
  return (
    `<input type="checkbox" class="film-details__control-input visually-hidden" id="${name}" name="${name}" ${isChecked ? `checked` : ``}>
    <label for="${name}" class="film-details__control-label film-details__control-label--${name}">${label}</label>`
  );
};

const createEmojiImageMarkup = (emotion) => {
  const newMarkUp = `<img src="images/emoji/${emotion}.png" width="55" height="55" alt="emoji-${emotion}"></img>`;
  const markUp = emotion ? newMarkUp : ``;

  return markUp;
};

const createEmojiMarkup = (emotion, isEmojiChecked) => {
  return (
    `<input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-${emotion}" value="smile" ${isEmojiChecked ? `checked` : ``}>
    <label class="film-details__emoji-label" for="emoji-${emotion}">
      <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji">
    </label>`
  );
};

const createEmojiTemplate = (emotions, checkedEmotion) => {
  return emotions.map((it) => createEmojiMarkup(it, it === checkedEmotion)).join(``);
};

const createFilmDetailsPopupTemplate = (card, comments, options = {}) => {
  const {actors, age, country, description, director, duration: durationInMinutes, genres, image, rating, releaseDate, title, originalTitle, writers} = card;
  const {emotion, isAddedToWatchlist, isWatched, isFavourite, deletingButtonId} = options;

  const commentsCount = comments.length;

  const filmReleaseDate = moment(releaseDate).format(`DD MMMM YYYY`);
  const duration = fromMinutesToHours(durationInMinutes);

  const watchlistButton = createButtonMarkup(PopupButton.WATCHLIST.name, PopupButton.WATCHLIST.label, isAddedToWatchlist);
  const watchedButton = createButtonMarkup(PopupButton.WATCHED.name, PopupButton.WATCHED.label, isWatched);
  const favouritesButton = createButtonMarkup(PopupButton.FAVOURITE.name, PopupButton.FAVOURITE.label, isFavourite);

  return (
    `<section class="film-details">
      <form class="film-details__inner" action="" method="get">
        <div class="form-details__top-container">
          <div class="film-details__close">
            <button class="film-details__close-btn" type="button">close</button>
          </div>
          <div class="film-details__info-wrap">
            <div class="film-details__poster">
              <img class="film-details__poster-img" src=${image} alt="">

              <p class="film-details__age">${age}+</p>
            </div>

            <div class="film-details__info">
              <div class="film-details__info-head">
                <div class="film-details__title-wrap">
                  <h3 class="film-details__title">${title}</h3>
                  <p class="film-details__title-original">Original: ${originalTitle}</p>
                </div>

                <div class="film-details__rating">
                  <p class="film-details__total-rating">${rating}</p>
                </div>
              </div>

              <table class="film-details__table">
                <tr class="film-details__row">
                  <td class="film-details__term">Director</td>
                  <td class="film-details__cell">${director}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Writers</td>
                  <td class="film-details__cell">${writers.join(`, `)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Actors</td>
                  <td class="film-details__cell">${actors.join(`, `)}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Release Date</td>
                  <td class="film-details__cell">${filmReleaseDate}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Runtime</td>
                  <td class="film-details__cell">${duration}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">Country</td>
                  <td class="film-details__cell">${country}</td>
                </tr>
                <tr class="film-details__row">
                  <td class="film-details__term">${genres.length > 1 ? `Genres` : `Genre`}</td>
                  <td class="film-details__cell">
                    ${genres.map((it) => `<span class="film-details__genre">${it}</span>`).join(`\n`)}
                  </td>
                </tr>
              </table>

              <p class="film-details__film-description">${description}</p>
            </div>
          </div>

          <section class="film-details__controls">
            ${watchlistButton}
            ${watchedButton}
            ${favouritesButton}
          </section>
        </div>

        <div class="form-details__bottom-container">
          <section class="film-details__comments-wrap">
            <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${commentsCount}</span></h3>

            <ul class="film-details__comments-list">
              ${createCommentsMarkup(comments, deletingButtonId)}
            </ul>

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label">
                ${createEmojiImageMarkup(emotion)}
              </div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                ${createEmojiTemplate(EMOTIONS, emotion)}
              </div>
            </div>
          </section>
        </div>
      </form>
    </section>`
  );
};

export default class DetailsPopup extends AbstractSmartComponent {
  constructor(card, comments) {
    super();
    this._card = card;
    this._commentsModel = comments;
    this._emotion = null;

    this._isAddedToWatchlist = card.controls.isAddedToWatchlist;
    this._isWatched = card.controls.isWatched;
    this._isFavourite = card.controls.isFavourite;
    this._commentsIds = card.commentsIds;
    this._deletingButtonId = null,

    this._closeButtonHandler = null;
    this._setDeleteCommentClickHandler = null;
    this._setNewCommentSubmitHandler = null;

    this.setEmotionClickHandler();
    this._subscribeOnEvents();

    this._onCommentsChange = this._onCommentsChange.bind(this);

    this._commentsModel.setDataChangeHandler(this._onCommentsChange);
  }

  disable() {
    this.getElement().querySelector(`.film-details__inner`).setAttribute(`disabled`, `disabled`);
  }

  disableCommentButton(id) {
    const commentsButtons = this.getElement().querySelectorAll(`.film-details__comment-delete`);
    const commentButton = Array.from(commentsButtons).find((button) => button.dataset.id === id);

    commentButton.setAttribute(`disabled`, `disabled`);
  }

  enable() {
    this.getElement().querySelector(`.film-details__inner`).removeAttribute(`disabled`);
  }

  enableCommentButton(id) {
    const commentsButtons = this.getElement().querySelectorAll(`.film-details__comment-delete`);
    const commentButton = Array.from(commentsButtons).find((button) => button.dataset.id === id);

    commentButton.removeAttribute(`disabled`);
  }

  getTemplate() {
    return createFilmDetailsPopupTemplate(this._card, this._commentsModel.getComments(), {
      emotion: this._emotion,
      isAddedToWatchlist: this._isAddedToWatchlist,
      isWatched: this._isWatched,
      isFavourite: this._isFavourite,
      deletingButtonId: this._deletingButtonId,
    });
  }

  getData() {
    return {
      controls: {
        isAddedToWatchlist: this._isAddedToWatchlist,
        isWatched: this._isWatched,
        isFavourite: this._isFavourite,
      },
    };
  }

  setCloseButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);

    this._closeButtonHandler = handler;
  }

  setDeletindButton(id) {
    this._deletingButtonId = id;

    this.rerender();
  }

  setDeleteCommentClickHandler(handler) {
    Array.from(this.getElement()
    .querySelectorAll(`.film-details__comment-delete`))
    .forEach((comment) => {
      comment.addEventListener(`click`, (evt) => {
        evt.preventDefault();

        const commentId = evt.target.dataset.id;
        handler(commentId);

        this.rerender();
      });
    });

    this._setDeleteCommentClickHandler = handler;
  }

  setNewCommentSubmitHandler(handler) {
    this.getElement()
    .querySelector(`.film-details__comment-input`)
    .addEventListener(`keydown`, (evt) => {
      if (evt.key === Button.ENTER && (evt.ctrlKey || evt.metaKey)) {
        const commentMessage = encode(evt.target.value);

        if (this._emotion && commentMessage) {
          const newCommentData = this._createNewComment(commentMessage, this._emotion);
          const newComment = new CommentModel(newCommentData);

          handler(newComment);
        }
      }
    });

    this._setNewCommentSubmitHandler = handler;
  }

  shake() {
    shake(this.getElement());

    const formInput = this.getElement().querySelector(`.film-details__comment-input`);
    formInput.style.border = `4px solid red`;

    setTimeout(() => {
      formInput.style.border = ``;
    }, SHAKE_ANIMATION_TIMEOUT);
  }

  shakeComment(comment) {
    shake(comment);
  }

  rerender() {
    super.rerender();
  }

  setEmotionClickHandler() {
    Array.from(this.getElement()
    .querySelectorAll(`.film-details__emoji-label`))
    .forEach((emojiLabel) => {
      emojiLabel.addEventListener(`click`, (evt) => {
        evt.preventDefault();

        const emotion = emojiLabel.getAttribute(`for`).substring(`emoji-`.length);
        createEmojiImageMarkup(emotion);
        this._emotion = emotion;

        this.rerender();
      });
    });
  }

  recoveryListeners() {
    this.setEmotionClickHandler();
    this.setCloseButtonClickHandler(this._closeButtonHandler);
    this.setDeleteCommentClickHandler(this._setDeleteCommentClickHandler);
    this.setNewCommentSubmitHandler(this._setNewCommentSubmitHandler);
    this._subscribeOnEvents();
  }

  _createNewComment(message, emotion) {
    return {
      [`date`]: String(new Date()),
      [`emotion`]: emotion,
      [`comment`]: message,
    };
  }

  _onCommentsChange() {
    this._clearNewComment();
    this.rerender();
  }

  _subscribeOnEvents() {
    this.getElement().querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();

        this._isAddedToWatchlist = !this._isAddedToWatchlist;

        this.rerender();
      });

    this.getElement().querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, (evt) => {
        evt.preventDefault();

        this._isWatched = !this._isWatched;

        this.rerender();
      });

    this.getElement().querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, () => {

        this._isFavourite = !this._isFavourite;
        this.rerender();
      });
  }

  _clearNewComment() {
    this._emotion = null;
  }
}
