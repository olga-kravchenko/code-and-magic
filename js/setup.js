'use strict';

const WIZARD_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const WIZARD_LAST_NAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const WIZARD_COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const WIZARD_EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
const WIZARD_FIREBALL_COLORS = [`#ee4830`, `#30a8ee`, `#5ce6c0`, `#e848d5`, `#e6e848`];
const MIN_ARRAY_INDEX = 0;
const MIN_NAME_LENGTH = 2;
const MAX_NAME_LENGTH = 25;

const userDialog = document.querySelector(`.setup`);
const setupSimilar = userDialog.querySelector(`.setup-similar`);
const setupOpen = document.querySelector(`.setup-open`);
const setupClose = userDialog.querySelector(`.setup-close`);
const inputUserName = userDialog.querySelector(`.setup-user-name`);
const wizardCoat = userDialog.querySelector(`.setup-wizard .wizard-coat`);
const wizardEyes = userDialog.querySelector(`.setup-wizard .wizard-eyes`);
const wizardFireBall = userDialog.querySelector(`.setup-fireball-wrap`);
const inputWizardCoat = userDialog.querySelector(`input[name="coat-color"]`);
const inputWizardEyes = userDialog.querySelector(`input[name="eyes-color"]`);
const inputWizardFireBall = userDialog.querySelector(`input[name="fireball-color"]`);

wizardCoat.addEventListener(`click`, () => {
  wizardCoat.style.fill = WIZARD_COAT_COLORS[getRandomNumber(MIN_ARRAY_INDEX, WIZARD_COAT_COLORS.length)];
  inputWizardCoat.value = wizardCoat.style.fill;
});

wizardEyes.addEventListener(`click`, () => {
  wizardEyes.style.fill = WIZARD_EYES_COLORS[getRandomNumber(MIN_ARRAY_INDEX, WIZARD_EYES_COLORS.length)];
  inputWizardEyes.value = wizardEyes.style.fill;
});

wizardFireBall.addEventListener(`click`, () => {
  wizardFireBall.style.backgroundColor = WIZARD_FIREBALL_COLORS[getRandomNumber(MIN_ARRAY_INDEX, WIZARD_FIREBALL_COLORS.length)];
  inputWizardFireBall.value = WIZARD_FIREBALL_COLORS[getRandomNumber(MIN_ARRAY_INDEX, WIZARD_FIREBALL_COLORS.length)];
});

const similarListElement = document.querySelector(`.setup-similar-list`);
const similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content;

const onPopupEscPress = function (evt) {
  if (evt.key === `Escape` && inputUserName !== document.activeElement) {
    evt.preventDefault();
    closePopup();
  }
};

const openPopup = () => {
  userDialog.classList.remove(`hidden`);
  setupSimilar.classList.remove(`hidden`);

  document.addEventListener(`keydown`, onPopupEscPress);
};

const closePopup = () => {
  userDialog.classList.add(`hidden`);
  setupSimilar.classList.add(`hidden`);

  document.removeEventListener(`keydown`, onPopupEscPress);
};

setupOpen.addEventListener(`click`, () => {
  openPopup();
});

setupOpen.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    openPopup();
  }
});

setupClose.addEventListener(`click`, () => {
  closePopup();
});

setupClose.addEventListener(`keydown`, (evt) => {
  if (evt.key === `Enter`) {
    closePopup();
  }
});

inputUserName.addEventListener(`input`, () => {
  const valueLength = inputUserName.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    inputUserName.setCustomValidity(`Ещё ` + (MIN_NAME_LENGTH - valueLength) + ` симв.`);
  } else if (valueLength > MAX_NAME_LENGTH) {
    inputUserName.setCustomValidity(`Удалите лишние ` + (valueLength - MAX_NAME_LENGTH) + ` симв.`);
  } else {
    inputUserName.setCustomValidity(``);
  }

  inputUserName.reportValidity();
});


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
