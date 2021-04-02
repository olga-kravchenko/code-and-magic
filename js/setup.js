'use strict';

const WIZARD_NAMES = [`Иван`, `Хуан Себастьян`, `Мария`, `Кристоф`, `Виктор`, `Юлия`, `Люпита`, `Вашингтон`];
const WIZARD_LAST_NAME = [`да Марья`, `Верон`, `Мирабелла`, `Вальц`, `Онопко`, `Топольницкая`, `Нионго`, `Ирвинг`];
const WIZARD_COAT_COLOR = [`rgb(101, 137, 164)`, `rgb(241, 43, 107)`, `rgb(146, 100, 161)`, `rgb(56, 159, 117)`, `rgb(215, 210, 55)`, `rgb(0, 0, 0)`];
const WIZARD_EYES_COLOR = [`black`, `red`, `blue`, `yellow`, `green`];
const userDialog = document.querySelector(`.setup`);
const blockSimilarPersonage = document.querySelector(`.setup-similar`);

userDialog.classList.remove(`hidden`);
blockSimilarPersonage.classList.remove(`hidden`);

const similarListElement = document.querySelector(`.setup-similar-list`);
const similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content;

const getRandomListWizards = (quantityWizard) => {
  const wizards = [];
  for (let i = 0; i < quantityWizard; i++) {
    wizards.push({
      name: WIZARD_NAMES[getRandomNumber(WIZARD_NAMES.length, 0)] + ` ` + WIZARD_LAST_NAME[getRandomNumber(WIZARD_LAST_NAME.length, 0)],
      coatColor: WIZARD_COAT_COLOR[getRandomNumber(WIZARD_COAT_COLOR.length, 0)],
      eyesColor: WIZARD_EYES_COLOR[getRandomNumber(WIZARD_EYES_COLOR.length, 0)],
    });
  }
  return wizards;
};

const createDomElementWizard = (jsObject) => {
  const newDomElementWizard = similarWizardTemplate.cloneNode(true);

  newDomElementWizard.querySelector(`.setup-similar-label`).textContent = jsObject.name;
  newDomElementWizard.querySelector(`.wizard-coat`).style.fill = jsObject.coatColor;
  newDomElementWizard.querySelector(`.wizard-eyes`).style.fill = jsObject.eyesColor;

  return newDomElementWizard;
};

const fillDomElementByWizards = (objectArray) => {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < objectArray.length; i++) {
    const newWizard = createDomElementWizard(objectArray[i]);
    fragment.appendChild(newWizard);
  }
  similarListElement.appendChild(fragment);
};

const listWizards = getRandomListWizards(4);
fillDomElementByWizards(listWizards);
