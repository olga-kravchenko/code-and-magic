'use strict';

(() => {
  const avatarButton = document.querySelector(`.setup-open-icon`);
  const modal = document.querySelector(`.setup`);
  const form = modal.querySelector(`.setup-wizard-form`);
  const closeButton = modal.querySelector(`.setup-close`);

  const onEscKeydown = (evt) => {
    if (evt.key === `Escape` && window.input.name !== document.activeElement) {
      evt.preventDefault();
      closeModal();
    }
  };

  const onCloseEnterKeydown = (evt) => {
    if (evt.key === `Enter`) {
      closeModal();
    }
  };

  const onAvatarButtonEnterKeydown = (evt) => {
    if (evt.key === `Enter`) {
      openModal();
    }
  };

  const addCallBacksToCloseModal = () => {
    closeButton.addEventListener(`keydown`, onCloseEnterKeydown);
    document.addEventListener(`keydown`, onEscKeydown);
    closeButton.addEventListener(`click`, closeModal);
  };

  const removeCallBacksToCloseModal = () => {
    closeButton.removeEventListener(`keydown`, onCloseEnterKeydown);
    document.removeEventListener(`keydown`, onEscKeydown);
    closeButton.removeEventListener(`click`, closeModal);
  };

  const addCallBacksForForm = () => {
    window.window.input.name.addEventListener(`input`, window.input.check);
    window.modifyWizard.coatColor.addEventListener(`click`, window.modifyWizard.changeCoatColor);
    window.modifyWizard.wizardEyesColor.addEventListener(`click`, window.modifyWizard.changeWizardEyesColor);
    window.modifyWizard.fireBallColor.addEventListener(`click`, window.modifyWizard.changeFireBallColor);
  };

  const removeCallBacksForForm = () => {
    window.window.input.name.removeEventListener(`input`, window.window.input.check);
    window.modifyWizard.coatColor.removeEventListener(`click`, window.modifyWizard.changeCoatColor);
    window.modifyWizard.wizardEyesColor.removeEventListener(`click`, window.modifyWizard.changeWizardEyesColor);
    window.modifyWizard.fireBallColor.removeEventListener(`click`, window.modifyWizard.changeFireBallColor);
  };

  const showModal = () => {
    modal.classList.remove(`hidden`);
  };

  const hideModal = () => {
    modal.classList.add(`hidden`);
  };

  const openModal = () => {
    showModal();
    addCallBacksToCloseModal();
    addCallBacksForForm();
    window.movingModal.reset();
  };

  const closeModal = () => {
    hideModal();
    removeCallBacksToCloseModal();
    removeCallBacksForForm();
  };

  const sendFormDataToServer = (evt) => {
    evt.preventDefault();
    window.backend.save(new FormData(form), closeModal, window.util.showErrorModal);
  };

  const activate = () => {
    avatarButton.addEventListener(`keydown`, onAvatarButtonEnterKeydown);
    avatarButton.addEventListener(`click`, openModal);
    form.addEventListener(`submit`, sendFormDataToServer);
  };


  window.modal = {
    activate,
    popup: modal,
    avatar: avatarButton,
  };
})();
