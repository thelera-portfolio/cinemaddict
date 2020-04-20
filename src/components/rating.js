// звание пользователя
import {createStats} from "../mock/stats.js";
import AbstractComponent from "./abstract-component.js";

const statisticData = createStats();
const {rank} = statisticData;

const createUserProfileRatingTemplate = () =>
  `<section class="header__profile profile">
    <p class="profile__rating">${rank}</p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;

export default class Rating extends AbstractComponent {
  getTemplate() {
    return createUserProfileRatingTemplate();
  }
}
