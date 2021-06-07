'use strict';

const MAX_SHOWN_SIMILAR_WIZARD_QUANTITY = 4;

const wizardEyes = window.modal.popup.querySelector(`.setup-wizard .wizard-eyes`);
const wizardCoat = window.modal.popup.querySelector(`.setup-wizard .wizard-coat`);
const fireBall = window.modal.popup.querySelector(`.setup-fireball-wrap`);
const wizardCoatInput = window.modal.popup.querySelector(`input[name="coat-color"]`);
const wizardEyesInput = window.modal.popup.querySelector(`input[name="eyes-color"]`);
const fireballInput = window.modal.popup.querySelector(`input[name="fireball-color"]`);
const similarWizardsList = window.modal.popup.querySelector(`.setup-similar-list`);
const similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content;
const similarWizardsBlock = window.modal.popup.querySelector(`.setup-similar`);

let wizards = [];
let coatColor = `rgb(101, 137, 164)`;
let eyesColor = `black`;

const getWizardDomElement = (wizard) => {
  const newWizard = similarWizardTemplate.cloneNode(true);
  newWizard.querySelector(`.setup-similar-label`).textContent = wizard.name;
  newWizard.querySelector(`.wizard-coat`).style.fill = wizard.colorCoat;
  newWizard.querySelector(`.wizard-eyes`).style.fill = wizard.colorEyes;
  return newWizard;
};

const fillPageByWizards = (incomingWizards) => {
  const shownWizardQuantity = incomingWizards.length > MAX_SHOWN_SIMILAR_WIZARD_QUANTITY ? MAX_SHOWN_SIMILAR_WIZARD_QUANTITY : incomingWizards.length;
  similarWizardsList.innerHTML = ``;
  for (let i = 0; i < shownWizardQuantity; i++) {
    similarWizardsList.appendChild(getWizardDomElement(incomingWizards[i]));
  }
  similarWizardsBlock.classList.remove(`hidden`);
};

const getRank = (wizard) => {
  let rank = 0;
  rank = wizard.colorCoat === coatColor ? rank + 2 : rank;
  rank = wizard.colorEyes === eyesColor ? rank + 1 : rank;
  return rank;
};

const namesComparator = (left, right) => {
  if (left > right) {
    return 1;
  } else if (left < right) {
    return -1;
  } else {
    return 0;
  }
};

const comparator = (left, right) => {
  let rankDifference = getRank(right) - getRank(left);
  rankDifference = rankDifference === 0 ? namesComparator(left.name, right.name) : rankDifference;
  return rankDifference;
};

const updateWizards = () => {
  const sortedWizard = wizards.sort(comparator);
  fillPageByWizards(sortedWizard);
};

const getUniqueColor = (colors, input) => {
  let newColor = colors[window.util.getRandomNumber(window.util.MIN_ARRAY_INDEX, colors.length)];
  while (newColor === input.value) {
    newColor = colors[window.util.getRandomNumber(window.util.MIN_ARRAY_INDEX, colors.length)];
  }
  return newColor;
};

const setRandomColor = (colors, input, clickedElement) => {
  let newColor = getUniqueColor(colors, input);
  if (clickedElement === fireBall) {
    clickedElement.style.background = newColor;
    fireballInput.value = newColor;
  } else {
    if (clickedElement === wizardCoat) {
      coatColor = newColor;
    } else if (clickedElement === wizardEyes) {
      eyesColor = newColor;
    }
    clickedElement.style.fill = newColor;
    input.value = newColor;
  }
};

const onWizardCoatClickChangeColor = () => {
  setRandomColor(window.wizardData.COAT_COLORS, wizardCoatInput, wizardCoat);
  window.util.debounce();
};

const onWizardEyesClickChangeColor = () => {
  setRandomColor(window.wizardData.EYES_COLORS, wizardEyesInput, wizardEyes);
  window.util.debounce();
};

const onFireBallClickChangeColor = () => setRandomColor(window.wizardData.FIREBALL_COLORS, fireballInput, fireBall);

const addListeners = () => {
  wizardCoat.addEventListener(`click`, onWizardCoatClickChangeColor);
  wizardEyes.addEventListener(`click`, onWizardEyesClickChangeColor);
  fireBall.addEventListener(`click`, onFireBallClickChangeColor);
};

const removeListener = () => {
  wizardCoat.removeEventListener(`click`, onWizardCoatClickChangeColor);
  wizardEyes.removeEventListener(`click`, onWizardEyesClickChangeColor);
  fireBall.removeEventListener(`click`, onFireBallClickChangeColor);
};

const renderUpdateWizards = (data) => {
  wizards = data;
  updateWizards();
};

window.wizardsSetting = {
  renderUpdateWizards,
  updateWizards,
  addListeners,
  removeListener,
};
