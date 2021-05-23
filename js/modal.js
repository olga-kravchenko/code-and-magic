'use strict';

(() => {
  const avatarButton = document.querySelector(`.setup-open-icon`);
  const modal = document.querySelector(`.setup`);
  const form = modal.querySelector(`.setup-wizard-form`);
  const closeButton = modal.querySelector(`.setup-close`);
  const inputName = modal.querySelector(`.setup-user-name`);

  const onEscKeydown = (evt) => {
    const isInputNameActive = inputName === document.activeElement;
    if (evt.key === `Escape` && !isInputNameActive) {
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
    document.addEventListener(`keydown`, onEscKeydown);
    closeButton.addEventListener(`keydown`, onCloseEnterKeydown);
    closeButton.addEventListener(`click`, closeModal);
  };

  const removeCallBacksToCloseModal = () => {
    document.removeEventListener(`keydown`, onEscKeydown);
    closeButton.removeEventListener(`keydown`, onCloseEnterKeydown);
    closeButton.removeEventListener(`click`, closeModal);
  };

  const addCallBacksForForm = () => {
    window.input.addListener();
    window.wizardsSetting.addListeners();
  };

  const removeCallBacksForForm = () => {
    window.input.removeListener();
    window.wizardsSetting.removeListener();
  };

  const showModal = () => modal.classList.remove(`hidden`);
  const hideModal = () => modal.classList.add(`hidden`);

  const openModal = () => {
    showModal();
    addCallBacksToCloseModal();
    addCallBacksForForm();
    window.moveModal.addListener();
    window.moveModal.resetPosition();
  };

  const closeModal = () => {
    hideModal();
    removeCallBacksToCloseModal();
    removeCallBacksForForm();
    window.moveModal.removeListener();
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
