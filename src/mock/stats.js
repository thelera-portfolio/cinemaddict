import {getRandomIntegerNumber, getRandomArrayItem} from "../utils";
import {GENRES} from "./card.js";

const RANKS = [`Sci-Fighter`, `King Of Drama`, `Comic`, `Cartoon lover`, `Movie Buff`];

export const createStats = () => ({
  rank: getRandomArrayItem(RANKS),
  watchedCount: getRandomIntegerNumber(0, 100),
  duration: {
    hours: getRandomIntegerNumber(0, 100),
    minutes: getRandomIntegerNumber(0, 59)
  },
  topGenre: getRandomArrayItem(GENRES),
});
