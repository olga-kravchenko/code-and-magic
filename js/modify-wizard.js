'use strict';

(function () {
  const fireBallColor = window.dialog.modal.querySelector(`.setup-fireball-wrap`);
  const inputWizardCoat = window.dialog.modal.querySelector(`input[name="coat-color"]`);
  const inputWizardEyes = window.dialog.modal.querySelector(`input[name="eyes-color"]`);
  const inputFireBall = window.dialog.modal.querySelector(`input[name="fireball-color"]`);

  const changeCoatColor = () => {
    window.util.getNewColor(window.fillWizards.WIZARD_COAT_COLORS, inputWizardCoat, window.fillWizards.coatColor);
  };

  const changeWizardEyesColor = () => {
    window.util.getNewColor(window.fillWizards.WIZARD_EYES_COLORS, inputWizardEyes, window.fillWizards.wizardEyesColor);
  };

  const changeFireBallColor = () => {
    window.util.getNewColor(window.fillWizards.FIREBALL_COLORS, inputFireBall, fireBallColor);
  };

  window.modifyWizard = {
    fireBallColor,
    inputFireBall,
    changeCoatColor,
    changeWizardEyesColor,
    changeFireBallColor
  };
})();
