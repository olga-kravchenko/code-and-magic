'use strict';

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

const onAvatarButtonClick = () => {
  openModal();
};

const onCloseButtonClick = () => {
  closeModal();
};

const addCallBacksToCloseModal = () => {
  document.addEventListener(`keydown`, onEscKeydown);
  closeButton.addEventListener(`keydown`, onCloseEnterKeydown);
  closeButton.addEventListener(`click`, onCloseButtonClick);
};

const removeCallBacksToCloseModal = () => {
  document.removeEventListener(`keydown`, onEscKeydown);
  closeButton.removeEventListener(`keydown`, onCloseEnterKeydown);
  closeButton.removeEventListener(`click`, onCloseButtonClick);
};

const addCallBacksForForm = () => {
  window.input.addListener();
  window.wizard.addListeners();
  window.avatar.addListener();
};

const removeCallBacksForForm = () => {
  window.input.removeListener();
  window.wizard.removeListener();
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

const onFormDataToServerSubmit = (evt) => {
  evt.preventDefault();
  window.backend.save(new FormData(form), closeModal, window.util.showErrorModal);
  avatarButton.src = window.avatar.reader.result;
};

const activate = () => {
  avatarButton.addEventListener(`keydown`, onAvatarButtonEnterKeydown);
  avatarButton.addEventListener(`click`, onAvatarButtonClick);
  form.addEventListener(`submit`, onFormDataToServerSubmit);
};

window.modal = {
  activate,
  popup: modal,
  avatar: avatarButton,
};
