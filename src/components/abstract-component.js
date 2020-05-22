import {createElement} from "../utils/render.js";
import {ErrorMessage, HIDDEN} from "../utils/consts.js";

export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(ErrorMessage.CONSTRUCTOR);
    }

    this._element = null;
  }

  getTemplate() {
    throw new Error(ErrorMessage.getNotImplemented(`getTemplate`));
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

  show() {
    if (this._element) {
      this._element.classList.remove(HIDDEN);
    }
  }

  hide() {
    if (this._element) {
      this._element.classList.add(HIDDEN);
    }
  }
}
