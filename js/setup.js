'use strict';

const WIZARD_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const WIZARD_LAST_NAMES = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const WIZARD_COAT_COLORS = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const WIZARD_EYES_COLORS = [`black`, `red`, `blue`, `yellow`, `green`];
const MIN_ARRAY_INDEX = 0;

const userDialog = document.querySelector(`.setup`);
const setupSimilar = userDialog.querySelector(`.setup-similar`);

userDialog.classList.remove(`hidden`);
setupSimilar.classList.remove(`hidden`);

const similarListElement = document.querySelector(`.setup-similar-list`);
const similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content;

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
