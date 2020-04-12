// звание пользователя
import {createStats} from "../mock/stats.js";

const statisticData = createStats();
const {rank} = statisticData;

export const createUserProfileRatingTemplate = () => {
  return (
    `<section class="header__profile profile">
      <p class="profile__rating">${rank}</p>
      <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
    </section>`
  );
};
