import {fromMinutesToHours, getRandomArrayItem} from "../utils/common.js";
import AbstractSmartComponent from "./abstract-smart-component.js";
import {Emotions, PopupButtons} from "../utils/consts.js";
import CommentsComponent from "../components/comment.js";
import {commentsData} from "../mock/comment.js";
import {encode} from "he";
import moment from "moment";

const createCommentsMarkup = (comments) => {
  let markUp = ``;
  for (let i = 0; i < comments.length; i++) {
    markUp = markUp.concat(new CommentsComponent(comments[i]).getTemplate());
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

const createFilmDetailsPopupTemplate = (card, comments, emotion) => {
  const {actors, age, country, description, director, duration: durationInMinutes, genres, image, rating, releaseDate, title, originalTitle = title, writers} = card;

  const commentsCount = comments.length;

  const filmReleaseDate = moment(releaseDate).format(`DD MMMM YYYY`);
  const duration = fromMinutesToHours(durationInMinutes);

  const watchlistButton = createButtonMarkup(PopupButtons.WATCHLIST.name, PopupButtons.WATCHLIST.label, card.isAddedToWatchlist);
  const watchedButton = createButtonMarkup(PopupButtons.WATCHED.name, PopupButtons.WATCHED.label, card.isWatched);
  const favouritesButton = createButtonMarkup(PopupButtons.FAVOURITE.name, PopupButtons.FAVOURITE.label, card.isFavourite);

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
              ${createCommentsMarkup(comments)}
            </ul>

            <div class="film-details__new-comment">
              <div for="add-emoji" class="film-details__add-emoji-label">
                ${createEmojiImageMarkup(emotion)}
              </div>

              <label class="film-details__comment-label">
                <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
              </label>

              <div class="film-details__emoji-list">
                ${createEmojiTemplate(Emotions, emotion)}
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
    this._comments = comments;
    this._emotion = null;

    this._closeButtonHandler = null;
    this._addToWatchlistClickHandler = null;
    this._markAsWatchedClickHandler = null;
    this._addToFavouritesClickHandler = null;
    this._setDeleteCommentClickHandler = null;
    this._setNewCommentSubmitHandler = null;

    this.setEmotionClickHandler();
  }

  getTemplate() {
    return createFilmDetailsPopupTemplate(this._card, this._comments, this._emotion);
  }

  setCloseButtonClickHandler(handler) {
    this.getElement().querySelector(`.film-details__close-btn`)
      .addEventListener(`click`, handler);

    this._closeButtonHandler = handler;
  }

  setAddToWatchlistClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watchlist`)
      .addEventListener(`click`, handler);

    this._addToWatchlistClickHandler = handler;
  }

  setMarkAsWatchedClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--watched`)
      .addEventListener(`click`, handler);

    this._markAsWatchedClickHandler = handler;
  }

  setAddToFavouritesClickHandler(handler) {
    this.getElement().querySelector(`.film-details__control-label--favorite`)
      .addEventListener(`click`, handler);

    this._addToFavouritesClickHandler = handler;
  }

  setDeleteCommentClickHandler(handler) {
    Array.from(this.getElement()
    .querySelectorAll(`.film-details__comment-delete`))
    .forEach((comment) => {
      comment.addEventListener(`click`, handler);
    });

    this._setDeleteCommentClickHandler = handler;
  }

  setNewCommentSubmitHandler(handler) {
    this.getElement()
    .querySelector(`.film-details__comment-input`)
    .addEventListener(`keydown`, (evt) => {
      if (evt.key === `Enter`) {
        const commentMessage = encode(evt.target.value);
        if (this._emotion) {
          const newComment = this._createNewComment(commentMessage, this._emotion);
          handler(newComment);
        }
      }
    });

    this._setNewCommentSubmitHandler = handler;
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
    this.setAddToWatchlistClickHandler(this._addToWatchlistClickHandler);
    this.setMarkAsWatchedClickHandler(this._markAsWatchedClickHandler);
    this.setAddToFavouritesClickHandler(this._addToFavouritesClickHandler);
    this.setDeleteCommentClickHandler(this._setDeleteCommentClickHandler);
    this.setNewCommentSubmitHandler(this._setNewCommentSubmitHandler);
  }

  _createNewComment(message, emotion) {
    return {
      id: String(new Date() + Math.random()),
      author: getRandomArrayItem(commentsData.authors),
      date: new Date(),
      emotion,
      message,
    };
  }
}
