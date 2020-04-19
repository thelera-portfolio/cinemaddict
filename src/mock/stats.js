import {getRandomIntegerNumber, getRandomArrayItem} from "../utils/common";
import {GENRES} from "./card.js";
import {RANKS, StatsData} from "../utils/consts.js";

export const createStats = () => ({
  rank: getRandomArrayItem(RANKS),
  watchedCount: getRandomIntegerNumber(0, StatsData.MAX_WATCHED_COUNT),
  duration: {
    hours: getRandomIntegerNumber(0, StatsData.MAX_HOURS_DURATION),
    minutes: getRandomIntegerNumber(0, 59)
  },
  topGenre: getRandomArrayItem(GENRES),
});
