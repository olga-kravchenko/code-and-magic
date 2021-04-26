'use strict';

(() => {
  const MIN_ARRAY_INDEX = 0;

  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const setNewColor = (colors, input, styleOfElement) => {
    let newColor = colors[getRandomNumber(MIN_ARRAY_INDEX, colors.length)];
    while (newColor === input.value) {
      newColor = colors[getRandomNumber(MIN_ARRAY_INDEX, colors.length)];
    }
    if (styleOfElement === window.modifyWizard.fireBallColor) {
      styleOfElement.style.background = newColor;
      window.modifyWizard.fireballInput.value = newColor;
    } else {
      styleOfElement.style.fill = newColor;
      input.value = newColor;
    }
  };

  const errorHandler = (onError) => {
    const errModal = document.createElement(`div`);
    errModal.style = `
    z-index: 100;
    margin: 330px auto;
    padding: 10px;
    text-align: center;
    background-color: red;
    border: 2px solid white;
    opacity: 0.9;
    width: 600px`;
    errModal.style.position = `absolute`;
    errModal.style.left = 0;
    errModal.style.right = 0;
    errModal.style.fontSize = `30px`;
    errModal.textContent = onError;
    document.body.insertAdjacentElement(`afterbegin`, errModal);
  };

  window.util = {
    MIN_ARRAY_INDEX,
    getRandomNumber,
    setNewColor,
    errorHandler,
  };
})();
