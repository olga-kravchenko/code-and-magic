'use strict';

(() => {
  const MIN_NAME_LENGTH = 2;
  const inputName = window.modal.popup.querySelector(`.setup-user-name`);

  const checkInput = () => {
    const length = inputName.value.trim().length;

    if (length < MIN_NAME_LENGTH) {
      inputName.setCustomValidity(`Ещё ` + (MIN_NAME_LENGTH - length) + ` симв.`);
    } else {
      inputName.setCustomValidity(``);
    }
    inputName.reportValidity();
  };

  window.input = {
    name: inputName,
    check: checkInput,
  };
})();
