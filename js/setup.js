'use strict';

const WIZARD_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const WIZARD_LAST_NAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const WIZARD_COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const WIZARD_EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
const FIREBALL_COLORS = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];
const MIN_ARRAY_INDEX = 0;
const MIN_NAME_LENGTH = 2;

const userDialog = document.querySelector(`.setup`);
const setupSimilar = userDialog.querySelector(`.setup-similar`);
const setupOpenIcon = document.querySelector(`.setup-open-icon`);
const setupClose = userDialog.querySelector(`.setup-close`);
const inputUserName = userDialog.querySelector(`.setup-user-name`);
const wizardCoat = userDialog.querySelector(`.setup-wizard .wizard-coat`);
const wizardEyes = userDialog.querySelector(`.setup-wizard .wizard-eyes`);
const fireBall = userDialog.querySelector(`.setup-fireball-wrap`);
const inputWizardCoat = userDialog.querySelector(`input[name="coat-color"]`);
const inputWizardEyes = userDialog.querySelector(`input[name="eyes-color"]`);
const inputFireBall = userDialog.querySelector(`input[name="fireball-color"]`);

const similarListElement = document.querySelector(`.setup-similar-list`);
const similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content;

const onPopupEscPress = (evt) => {
  if (evt.key === `Escape` && inputUserName !== document.activeElement) {
    evt.preventDefault();
    closePopup();
  }
};

const onSetupCloseEnterPress = (evt) => {
  if (evt.key === `Enter`) {
    closePopup();
  }
};

const onSetupOpenIconEnterPress = (evt) => {
  if (evt.key === `Enter`) {
    openPopup();
  }
};

const checkInputUserNameValue = () => {
  const valueLength = inputUserName.value.trim().length;

  if (valueLength < MIN_NAME_LENGTH) {
    inputUserName.setCustomValidity(`Ещё ` + (MIN_NAME_LENGTH - valueLength) + ` симв.`);
  } else {
    inputUserName.setCustomValidity(``);
  }

  inputUserName.reportValidity();
};

const changeWizardCoat = () => {
  let newColor = WIZARD_COAT_COLORS[getRandomNumber(MIN_ARRAY_INDEX, WIZARD_COAT_COLORS.length)];
  while (newColor === inputWizardCoat.value) {
    newColor = WIZARD_COAT_COLORS[getRandomNumber(MIN_ARRAY_INDEX, WIZARD_COAT_COLORS.length)];
  }
  wizardCoat.style.fill = newColor;
  inputWizardCoat.value = wizardCoat.style.fill;
};

const changeWizardEyes = () => {
  let newColor = WIZARD_EYES_COLORS[getRandomNumber(MIN_ARRAY_INDEX, WIZARD_EYES_COLORS.length)];
  while (newColor === inputWizardEyes.value) {
    newColor = WIZARD_EYES_COLORS[getRandomNumber(MIN_ARRAY_INDEX, WIZARD_EYES_COLORS.length)];
  }
  wizardEyes.style.fill = newColor;
  inputWizardEyes.value = wizardEyes.style.fill;
};

const changeFireBall = () => {
  let newColor = FIREBALL_COLORS[getRandomNumber(MIN_ARRAY_INDEX, FIREBALL_COLORS.length)];
  while (newColor === inputFireBall.value) {
    newColor = FIREBALL_COLORS[getRandomNumber(MIN_ARRAY_INDEX, FIREBALL_COLORS.length)];
  }
  fireBall.style.backgroundColor = newColor;
  inputFireBall.value = fireBall.style.backgroundColor;
};

const openPopup = () => {
  userDialog.classList.remove(`hidden`);
  setupSimilar.classList.remove(`hidden`);

  setupClose.addEventListener(`keydown`, onSetupCloseEnterPress);
  document.addEventListener(`keydown`, onPopupEscPress);
  setupClose.addEventListener(`click`, closePopup);

  setupOpenIcon.removeEventListener(`keydown`, onSetupOpenIconEnterPress);
  setupOpenIcon.removeEventListener(`click`, openPopup);

  inputUserName.addEventListener(`input`, checkInputUserNameValue);
  wizardCoat.addEventListener(`click`, changeWizardCoat);
  wizardEyes.addEventListener(`click`, changeWizardEyes);
  fireBall.addEventListener(`click`, changeFireBall);
};

const closePopup = () => {
  userDialog.classList.add(`hidden`);
  setupSimilar.classList.add(`hidden`);

  setupClose.removeEventListener(`keydown`, onSetupCloseEnterPress);
  document.removeEventListener(`keydown`, onPopupEscPress);
  setupClose.removeEventListener(`click`, closePopup);
  inputUserName.removeEventListener(`input`, checkInputUserNameValue);

  setupOpenIcon.addEventListener(`keydown`, onSetupOpenIconEnterPress);
  setupOpenIcon.addEventListener(`click`, openPopup);

  wizardCoat.removeEventListener(`click`, changeWizardCoat);
  wizardEyes.removeEventListener(`click`, changeWizardEyes);
  fireBall.removeEventListener(`click`, changeFireBall);
};

setupOpenIcon.addEventListener(`keydown`, onSetupOpenIconEnterPress);
setupOpenIcon.addEventListener(`click`, openPopup);
setupClose.addEventListener(`click`, closePopup);

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

const fillDomElementByWizards = (wizards) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < wizards.length; i++) {
    const newWizard = getWizardDomElement(wizards[i]);
    fragment.appendChild(newWizard);
  }
  similarListElement.appendChild(fragment);
};

const wizards = getRandomWizards(4);
fillDomElementByWizards(wizards);
