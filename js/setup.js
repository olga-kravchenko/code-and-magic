'use strict';

const WIZARD_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const WIZARD_LAST_NAME = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const WIZARD_COAT_COLOR = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const WIZARD_EYES_COLOR = [`black`, `red`, `blue`, `yellow`, `green`];

const userDialog = document.querySelector(`.setup`);
userDialog.classList.remove(`hidden`);

const blockSimilarPersonage = document.querySelector(`.setup-similar`);
blockSimilarPersonage.classList.remove(`hidden`);

const similarListElement = document.querySelector(`.setup-similar-list`);
const similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content;

const getRandomData = (max, min) => {
  return Math.floor(Math.random() * (max - min) + min);
};

const getCreateWizards = (wizardItem, wizard) => {
  wizardItem.querySelector(`.setup-similar-label`).textContent = wizard.name;
  wizardItem.querySelector(`.wizard-coat`).style.fill = wizard.coatColor;
  wizardItem.querySelector(`.wizard-eyes`).style.fill = wizard.eyesColor;
};

const getCreateArray = (wizardsArray) => {
  wizardsArray.push({
    name: WIZARD_NAMES[getRandomData(WIZARD_NAMES.length, 0)] + ` ` + WIZARD_LAST_NAME[getRandomData(WIZARD_LAST_NAME.length, 0)],
    coatColor: WIZARD_COAT_COLOR[getRandomData(WIZARD_COAT_COLOR.length, 0)],
    eyesColor: WIZARD_EYES_COLOR[getRandomData(WIZARD_EYES_COLOR.length, 0)],
  });
};

const getCompletionBlock = () => {
  const wizards = [];
  for (let i = 0; i < 4; i++) {
    const similarWizardItem = similarWizardTemplate.cloneNode(true);
    getCreateArray(wizards);
    getCreateWizards(similarWizardItem, wizards[i]);
    similarListElement.appendChild(similarWizardItem);
  }
};

getCompletionBlock();
