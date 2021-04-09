'use strict';

const WIZARD_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const WIZARD_LAST_NAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const WIZARD_COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const WIZARD_EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
const FIREBALL_COLORS = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];
const MIN_ARRAY_INDEX = 0;
const MIN_NAME_LENGTH = 2;

const modal = document.querySelector(`.setup`);
const similarWizardsBlock = modal.querySelector(`.setup-similar`);
const avatar = document.querySelector(`.setup-open-icon`);
const closeButton = modal.querySelector(`.setup-close`);
const inputName = modal.querySelector(`.setup-user-name`);
const coatColor = modal.querySelector(`.setup-wizard .wizard-coat`);
const wizardEyesColor = modal.querySelector(`.setup-wizard .wizard-eyes`);
const fireBallColor = modal.querySelector(`.setup-fireball-wrap`);
const inputWizardCoat = modal.querySelector(`input[name="coat-color"]`);
const inputWizardEyes = modal.querySelector(`input[name="eyes-color"]`);
const inputFireBall = modal.querySelector(`input[name="fireball-color"]`);

const similarWizardsList = modal.querySelector(`.setup-similar-list`);
const similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content;

const onEscKeydown = (evt) => {
  if (evt.key === `Escape` && inputName !== document.activeElement) {
    evt.preventDefault();
    closePopup();
  }
};

const onCloseEnterKeydown = (evt) => {
  if (evt.key === `Enter`) {
    closePopup();
  }
};

const onAvatarEnterKeydown = (evt) => {
  if (evt.key === `Enter`) {
    openModal();
  }
};

const checkInput = () => {
  const length = inputName.value.trim().length;

  if (length < MIN_NAME_LENGTH) {
    inputName.setCustomValidity(`Ещё ` + (MIN_NAME_LENGTH - length) + ` симв.`);
  } else {
    inputName.setCustomValidity(``);
  }

  inputName.reportValidity();
};

const getNewColor = (colors, input, styleOfElement) => {
  let newColor = colors[getRandomNumber(MIN_ARRAY_INDEX, colors.length)];
  while (newColor === input.value) {
    newColor = colors[getRandomNumber(MIN_ARRAY_INDEX, colors.length)];
  }

  if (styleOfElement === fireBallColor) {
    styleOfElement.style.background = newColor;
    inputFireBall.value = newColor;
  } else {
    styleOfElement.style.fill = newColor;
    input.value = newColor;
  }
};

const changeCoatColor = () => {
  getNewColor(WIZARD_COAT_COLORS, inputWizardCoat, coatColor);
};

const changeWizardEyesColor = () => {
  getNewColor(WIZARD_EYES_COLORS, inputWizardEyes, wizardEyesColor);
};

const changeFireBallColor = () => {
  getNewColor(FIREBALL_COLORS, inputFireBall, fireBallColor);
};

const addCallBacksToCloseModal = () => {
  closeButton.addEventListener(`keydown`, onCloseEnterKeydown);
  document.addEventListener(`keydown`, onEscKeydown);
  closeButton.addEventListener(`click`, closePopup);
};

const removeCallBacksToCloseModal = () => {
  closeButton.removeEventListener(`keydown`, onCloseEnterKeydown);
  document.removeEventListener(`keydown`, onEscKeydown);
  closeButton.removeEventListener(`click`, closePopup);
};

const addCallBacksForForm = () => {
  inputName.addEventListener(`input`, checkInput);
  coatColor.addEventListener(`click`, changeCoatColor);
  wizardEyesColor.addEventListener(`click`, changeWizardEyesColor);
  fireBallColor.addEventListener(`click`, changeFireBallColor);
};

const removeCallBacksForForm = () => {
  inputName.removeEventListener(`input`, checkInput);
  coatColor.removeEventListener(`click`, changeCoatColor);
  wizardEyesColor.removeEventListener(`click`, changeWizardEyesColor);
  fireBallColor.removeEventListener(`click`, changeFireBallColor);
};

const showModal = () => {
  modal.classList.remove(`hidden`);
  similarWizardsBlock.classList.remove(`hidden`);
};

const hideModal = () => {
  modal.classList.add(`hidden`);
  similarWizardsBlock.classList.add(`hidden`);
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

const getRandomWizards = (quantity) => {
  const wizards = [];
  for (let i = 0; i < quantity; i++) {
    wizards.push({
      name: WIZARD_NAMES[getRandomNumber(MIN_ARRAY_INDEX, WIZARD_NAMES.length)] + ` ` + WIZARD_LAST_NAMES[getRandomNumber(MIN_ARRAY_INDEX, WIZARD_LAST_NAMES.length)],
      coatColor: WIZARD_COAT_COLORS[getRandomNumber(MIN_ARRAY_INDEX, WIZARD_COAT_COLORS.length)],
      eyesColor: WIZARD_EYES_COLORS[getRandomNumber(MIN_ARRAY_INDEX, WIZARD_EYES_COLORS.length)],
    });
  }
  return wizards;
};

const getWizardDomElement = (wizard) => {
  const newWizard = similarWizardTemplate.cloneNode(true);

  newWizard.querySelector(`.setup-similar-label`).textContent = wizard.name;
  newWizard.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  newWizard.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;

  return newWizard;
};

const fillPageByWizards = (wizards) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < wizards.length; i++) {
    const newWizard = getWizardDomElement(wizards[i]);
    fragment.appendChild(newWizard);
  }
  similarWizardsList.appendChild(fragment);
};

const wizards = getRandomWizards(4);
fillPageByWizards(wizards);
