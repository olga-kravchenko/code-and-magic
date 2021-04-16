'use strict';

(function () {
  const getRandomNumber = (min, max) => {
    return Math.floor(Math.random() * (max - min) + min);
  };

  const onEscKeydown = (evt) => {
    if (evt.key === `Escape` && window.checkInput.inputName !== document.activeElement) {
      evt.preventDefault();
      window.dialog.closePopup();
    }
  };

  const onCloseEnterKeydown = (evt) => {
    if (evt.key === `Enter`) {
      window.dialog.closePopup();
    }
  };

  const getNewColor = (colors, input, styleOfElement) => {
    let newColor = colors[getRandomNumber(window.fillWizards.MIN_ARRAY_INDEX, colors.length)];
    while (newColor === input.value) {
      newColor = colors[getRandomNumber(window.fillWizards.MIN_ARRAY_INDEX, colors.length)];
    }

    if (styleOfElement === window.modifyWizard.fireBallColor) {
      styleOfElement.style.background = newColor;
      window.modifyWizard.inputFireBall.value = newColor;
    } else {
      styleOfElement.style.fill = newColor;
      input.value = newColor;
    }
  };

  window.util = {
    getRandomNumber,
    onEscKeydown,
    onCloseEnterKeydown,
    getNewColor,
  };
})();
