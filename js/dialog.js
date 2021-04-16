'use strict';

(function () {
  const modal = document.querySelector(`.setup`);

  const avatar = document.querySelector(`.setup-open-icon`);
  const closeButton = modal.querySelector(`.setup-close`);

  const onAvatarEnterKeydown = (evt) => {
    if (evt.key === `Enter`) {
      openModal();
    }
  };

  const addCallBacksToCloseModal = () => {
    closeButton.addEventListener(`keydown`, window.util.onCloseEnterKeydown);
    document.addEventListener(`keydown`, window.util.onEscKeydown);
    closeButton.addEventListener(`click`, closePopup);
  };

  const removeCallBacksToCloseModal = () => {
    closeButton.removeEventListener(`keydown`, window.util.onCloseEnterKeydown);
    document.removeEventListener(`keydown`, window.util.onEscKeydown);
    closeButton.removeEventListener(`click`, closePopup);
  };

  const addCallBacksForForm = () => {
    window.checkInput.inputName.addEventListener(`input`, window.checkInput.checkInput);
    window.fillWizards.coatColor.addEventListener(`click`, window.modifyWizard.changeCoatColor);
    window.fillWizards.wizardEyesColor.addEventListener(`click`, window.modifyWizard.changeWizardEyesColor);
    window.modifyWizard.fireBallColor.addEventListener(`click`, window.modifyWizard.changeFireBallColor);
  };

  const removeCallBacksForForm = () => {
    window.checkInput.inputName.removeEventListener(`input`, window.checkInput.checkInput);
    window.fillWizards.coatColor.removeEventListener(`click`, window.modifyWizard.changeCoatColor);
    window.fillWizards.wizardEyesColor.removeEventListener(`click`, window.modifyWizard.changeWizardEyesColor);
    window.modifyWizard.fireBallColor.removeEventListener(`click`, window.modifyWizard.changeFireBallColor);
  };

  const showModal = () => {
    modal.classList.remove(`hidden`);
    window.fillWizards.similarWizardsBlock.classList.remove(`hidden`);
  };

  const hideModal = () => {
    modal.classList.add(`hidden`);
    window.fillWizards.similarWizardsBlock.classList.add(`hidden`);
  };

  const openModal = () => {
    showModal();
    addCallBacksToCloseModal();
    addCallBacksForForm();
  };

  const closePopup = () => {
    hideModal();
    removeCallBacksToCloseModal();
    removeCallBacksForForm();
  };

  avatar.addEventListener(`keydown`, onAvatarEnterKeydown);
  avatar.addEventListener(`click`, openModal);

  window.dialog = {
    modal,
    closePopup,
  };
})();
