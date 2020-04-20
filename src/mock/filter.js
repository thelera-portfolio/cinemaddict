import {getRandomIntegerNumber} from "../utils/common";

const FILTER_NAMES = [`All movies`, `Watchlist`, `History`, `Favorites`];

export const createFilters = () => FILTER_NAMES.map((it) => {
  return {
    name: it,
    count: getRandomIntegerNumber(0, 10),
  };
});
