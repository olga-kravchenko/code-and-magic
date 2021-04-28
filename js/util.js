'use strict';

(() => {
  const MIN_ARRAY_INDEX = 0;

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
    }, 2000);
  };

  window.util = {
    MIN_ARRAY_INDEX,
    getRandomNumber,
    showErrorModal,
  };
})();
