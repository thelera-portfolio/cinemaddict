import AbstractComponent from "./abstract-component";
import {getError} from "../utils/common";

export default class AbstractSmartComponent extends AbstractComponent {
  recoveryListeners() {
    throw new Error(getError(`recoveryListeners`));
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
