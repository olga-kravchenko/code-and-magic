'use strict';

(() => {
  const MIN_NAME_LENGTH = 2;
  const inputName = window.dialog.modal.querySelector(`.setup-user-name`);

  const checkInput = () => {
    const length = inputName.value.trim().length;

    if (length < MIN_NAME_LENGTH) {
      inputName.setCustomValidity(`Ещё ` + (MIN_NAME_LENGTH - length) + ` симв.`);
    } else {
      inputName.setCustomValidity(``);
    }
    inputName.reportValidity();
  };

  window.checkInput = {
    inputName,
    checkInput,
  };
})();
