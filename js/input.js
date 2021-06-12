'use strict';

const MIN_NAME_LENGTH = 2;

const inputName = window.modal.popup.querySelector(`.setup-user-name`);

const onInputNameCheckInput = () => {
  const length = inputName.value.trim().length;
  const message = length < MIN_NAME_LENGTH ? `Ещё ${MIN_NAME_LENGTH - length} симв.` : ``;
  inputName.setCustomValidity(message);
  inputName.reportValidity();
};

const addListener = () => inputName.addEventListener(`input`, onInputNameCheckInput);
const removeListener = () => inputName.removeEventListener(`input`, onInputNameCheckInput);

window.input = {
  addListener,
  removeListener,
};
