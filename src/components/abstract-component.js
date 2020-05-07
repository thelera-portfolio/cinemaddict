import {createElement} from "../utils/render.js";
import {ClassError, HIDDEN_CLASS} from "../utils/consts.js";

export default class AbstractComponent {
  constructor() {
    if (new.target === AbstractComponent) {
      throw new Error(ClassError.CONSTRUCTOR);
    }
    this._element = null;
  }

  getTemplate() {
    throw new Error(ClassError.notImplemented(`getTemplate`));
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
      this._element.classList.remove(HIDDEN_CLASS);
    }
  }

  hide() {
    if (this._element) {
      this._element.classList.add(HIDDEN_CLASS);
    }
  }
}
