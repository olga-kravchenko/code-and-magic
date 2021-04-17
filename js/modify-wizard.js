'use strict';

(() => {
  const wizardEyesColor = window.modal.popup.querySelector(`.setup-wizard .wizard-eyes`);
  const coatColor = window.modal.popup.querySelector(`.setup-wizard .wizard-coat`);
  const fireBallColor = window.modal.popup.querySelector(`.setup-fireball-wrap`);
  const wizardCoatInput = window.modal.popup.querySelector(`input[name="coat-color"]`);
  const wizardEyesInput = window.modal.popup.querySelector(`input[name="eyes-color"]`);
  const fireballInput = window.modal.popup.querySelector(`input[name="fireball-color"]`);

  const changeCoatColor = () => {
    window.util.setNewColor(window.wizardData.COAT_COLORS, wizardCoatInput, coatColor);
  };

  const changeWizardEyesColor = () => {
    window.util.setNewColor(window.wizardData.EYES_COLORS, wizardEyesInput, wizardEyesColor);
  };

  const changeFireBallColor = () => {
    window.util.setNewColor(window.wizardData.FIREBALL_COLORS, fireballInput, fireBallColor);
  };

  window.modifyWizard = {
    fireBallColor,
    fireballInput,
    coatColor,
    wizardEyesColor,
    changeCoatColor,
    changeWizardEyesColor,
    changeFireBallColor
  };
})();
