'use strict';

const MIN_ARRAY_INDEX = 0;
const FILTER_SWITCHING_TIME = 500;
const ERROR_MODAL_DISPLAY_TIME = 2000;

let lastTimeout;

const debounce = () => {
  if (lastTimeout) {
    window.clearTimeout(lastTimeout);
  }
  lastTimeout = window.setTimeout(() => {
    window.wizard.update();
  }, FILTER_SWITCHING_TIME);
};

const getRandomNumber = (min, max) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const showErrorModal = (errorMessage) => {
  const errorModal = document.createElement(`div`);
  errorModal.classList.add(`modal-error`);
  errorModal.textContent = errorMessage;
  document.body.insertAdjacentElement(`afterbegin`, errorModal);
  setTimeout(() => {
    errorModal.remove();
  }, ERROR_MODAL_DISPLAY_TIME);
};

window.util = {
  MIN_ARRAY_INDEX,
  debounce,
  getRandomNumber,
  showErrorModal,
};
