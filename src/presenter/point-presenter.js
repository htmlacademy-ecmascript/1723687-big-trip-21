import FormEditView from "../view/form-edit-view.js";
import PointView from "../view/point-view.js";

import { render, replace } from "../framework/render.js";

export default class PointPresenter {
  #container = null;
  #destinationsModel = null;
  #offersModel = null;
  #point = null;
  #pointComponent = null;
  #pointEditComponent = null;
  constructor({ container, offersModel, destinationsModel }) {
    this.#container = container;
    this.#offersModel = offersModel;
    this.#destinationsModel = destinationsModel;
  }

  init(point) {
    this.#point = point;

    this.#pointComponent = new PointView({
      point: this.#point,
      pointDestinations: this.#destinationsModel.getById(point.destination),
      pointOffers: this.#offersModel.getByType(point.type),
      onEditClick: this.#handleEditClick,
    });

    this.#pointEditComponent = new FormEditView({
      point: this.#point,
      pointDestinations: this.#destinationsModel.getById(point.destination),
      pointOffers: this.#offersModel.getByType(point.type),
      onSubmitClick: this.#handleFormSubmit,
      onResetClick: this.#handleFormClose,
    });

    render(this.#pointComponent, this.#container);
  }

  #replacePointToForm() {
    replace(this.#pointEditComponent, this.#pointComponent);
    document.addEventListener('keydown', this.#escKeyDownHandler);
  }

  #replaceFormToPoint() {
    replace(this.#pointComponent, this.#pointEditComponent);
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === "Escape") {
      evt.preventDefault();
      this.#replaceFormToPoint();
    }
  };

  #handleEditClick = () => {
    this.#replacePointToForm();
  }

  #handleFormSubmit = () => {
    this.#replaceFormToPoint();
  }

  #handleFormClose = () => {
    this.#replaceFormToPoint();
  }
}
