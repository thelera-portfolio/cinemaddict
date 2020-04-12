// карточка фильма
const MAX_DESCRIPTION_LENGTH = 140;

export const createFilmCardTemplate = (card) => {
  const {commentsCount, controls, description, duration, genres, image, rating, releaseDate, title} = card;
  const shortDescription = description.length >= MAX_DESCRIPTION_LENGTH ? `${description.slice(0, MAX_DESCRIPTION_LENGTH)}...` : description;

  return (
    `<article class="film-card">
      <h3 class="film-card__title">${title}</h3>
      <p class="film-card__rating">${rating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${releaseDate.getFullYear()}</span>
        <span class="film-card__duration">${duration}</span>
        <span class="film-card__genre">${genres[0]}</span>
      </p>
      <img src=${image} alt="" class="film-card__poster">
      <p class="film-card__description">${shortDescription}</p>
      <a class="film-card__comments">${commentsCount} comments</a>
      <form class="film-card__controls">
        <button class="film-card__controls-item ${controls[0].isActive ? `film-card__controls-item--active` : ``} button film-card__controls-item--add-to-${controls[0].name}">Add to ${controls[0].name}</button>
        <button class="film-card__controls-item ${controls[1].isActive ? `film-card__controls-item--active` : ``} button film-card__controls-item--mark-as-${controls[1].name}">Mark as ${controls[1].name}</button>
        <button class="film-card__controls-item ${controls[2].isActive ? `film-card__controls-item--active` : ``} button film-card__controls-item--${controls[2].name}">Mark as ${controls[2].name}</button>
      </form>
    </article>`
  );
};
