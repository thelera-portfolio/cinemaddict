import {createElement} from "../utils/render.js";
import {ClassError} from "../utils/consts.js";

export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(ClassError.CONSTRUCTOR);
    }
    this._element = null;
  }

  getTemplate() {
    throw new Error(ClassError.GET_TEMPLATE);
  }

  getElement() {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }

    return this._element;
  }

  removeElement() {
    this._element = null;
  }
}
