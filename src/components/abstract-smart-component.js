import AbstractComponent from "./abstract-component.js";
import {ErrorMessage} from "../utils/consts.js";

export default class AbstractSmartComponent extends AbstractComponent {
  recoveryListeners() {
    throw new Error(ErrorMessage.getNotImplemented(`recoveryListeners`));
  }

  rerender() {
    const oldElement = this.getElement();
    const parent = oldElement.parentElement;

    this.removeElement();

    const newElement = this.getElement();
    parent.replaceChild(newElement, oldElement);

    this.recoveryListeners();
  }
}
