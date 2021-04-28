'use strict';

(() => {
  const wizardEyesColor = window.modal.popup.querySelector(`.setup-wizard .wizard-eyes`);
  const coatColor = window.modal.popup.querySelector(`.setup-wizard .wizard-coat`);
  const fireBallColor = window.modal.popup.querySelector(`.setup-fireball-wrap`);
  const wizardCoatInput = window.modal.popup.querySelector(`input[name="coat-color"]`);
  const wizardEyesInput = window.modal.popup.querySelector(`input[name="eyes-color"]`);
  const fireballInput = window.modal.popup.querySelector(`input[name="fireball-color"]`);

  const setNewColor = (colors, input, styleOfElement) => {
    let newColor = colors[window.util.getRandomNumber(window.util.MIN_ARRAY_INDEX, colors.length)];
    while (newColor === input.value) {
      newColor = colors[window.util.getRandomNumber(window.util.MIN_ARRAY_INDEX, colors.length)];
    }
    if (styleOfElement === fireBallColor) {
      styleOfElement.style.background = newColor;
      fireballInput.value = newColor;
    } else {
      styleOfElement.style.fill = newColor;
      input.value = newColor;
    }
  };

  const changeCoatColor = () => {
    setNewColor(window.wizardData.COAT_COLORS, wizardCoatInput, coatColor);
  };

  const changeWizardEyesColor = () => {
    setNewColor(window.wizardData.EYES_COLORS, wizardEyesInput, wizardEyesColor);
  };

  const changeFireBallColor = () => {
    setNewColor(window.wizardData.FIREBALL_COLORS, fireballInput, fireBallColor);
  };

  const addListeners = () => {
    coatColor.addEventListener(`click`, changeCoatColor);
    wizardEyesColor.addEventListener(`click`, changeWizardEyesColor);
    fireBallColor.addEventListener(`click`, changeFireBallColor);
  };

  const removeListener = () => {
    coatColor.removeEventListener(`click`, changeCoatColor);
    wizardEyesColor.removeEventListener(`click`, changeWizardEyesColor);
    fireBallColor.removeEventListener(`click`, changeFireBallColor);
  };

  window.modifyWizard = {
    addListeners,
    removeListener,
  };
})();
