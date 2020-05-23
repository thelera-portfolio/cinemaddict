import {RenderPosition} from "./consts.js";

const createElement = (template) => {
  const newElement = document.createElement(`div`);
  newElement.innerHTML = template;

  return newElement.firstChild;
};

const remove = (component) => {
  component.getElement().remove();
  component.removeElement();
};

const render = (container, component, place = RenderPosition.BEFOREEND) => {
  switch (place) {
    case RenderPosition.BEFOREEND:
      container.append(component.getElement());
      break;

    case RenderPosition.AFTERBEGIN:
      container.prepend(component.getElement());
      break;

    case RenderPosition.BEFORE:
      container.before(component.getElement());
      break;
  }
};

const replace = (newComponent, oldComponent) => {
  const parentElement = oldComponent.getElement().parentElement;
  const newElement = newComponent.getElement();
  const oldElement = oldComponent.getElement();

  const isExistElements = !!(parentElement || newElement || oldElement);
  if (isExistElements && parentElement.contains(oldElement)) {
    parentElement.replaceChild(newElement, oldElement);
  }
};

export {createElement, remove, render, replace};
