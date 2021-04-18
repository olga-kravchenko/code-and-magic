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

  window.util = {
    MIN_ARRAY_INDEX,
    getRandomNumber,
    setNewColor,
  };
})();
