'use strict';

(() => {
  const wizardEyes = window.modal.popup.querySelector(`.setup-wizard .wizard-eyes`);
  const wizardCoat = window.modal.popup.querySelector(`.setup-wizard .wizard-coat`);
  const fireBallColor = window.modal.popup.querySelector(`.setup-fireball-wrap`);
  const wizardCoatInput = window.modal.popup.querySelector(`input[name="coat-color"]`);
  const wizardEyesInput = window.modal.popup.querySelector(`input[name="eyes-color"]`);
  const fireballInput = window.modal.popup.querySelector(`input[name="fireball-color"]`);

  const MAX_SHOWN_SIMILAR_WIZARD_COUNT = 4;
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

  const fillPageByWizards = (wizards) => {
    const takeNumber = wizards.length > MAX_SHOWN_SIMILAR_WIZARD_COUNT ? MAX_SHOWN_SIMILAR_WIZARD_COUNT : wizards.length;
    similarWizardsList.innerHTML = ``;
    for (let i = 0; i < takeNumber; i++) {
      similarWizardsList.appendChild(getWizardDomElement(wizards[i]));
    }
    similarWizardsBlock.classList.remove(`hidden`);
  };

  const getRank = function (wizard) {
    let rank = 0;
    if (wizard.colorCoat === coatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === eyesColor) {
      rank += 1;
    }
    return rank;
  };

  const namesComparator = function (left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  };

  const updateWizards = () => {
    fillPageByWizards(wizards.sort(function (left, right) {
      let rankDifference = getRank(right) - getRank(left);
      if (rankDifference === 0) {
        rankDifference = namesComparator(left.name, right.name);
      }
      return rankDifference;
    }));
  };

  const getUniqueColor = (colors, input) => {
    let newColor = colors[window.util.getRandomNumber(window.util.MIN_ARRAY_INDEX, colors.length)];
    while (newColor === input.value) {
      newColor = colors[window.util.getRandomNumber(window.util.MIN_ARRAY_INDEX, colors.length)];
    }
    return newColor;
  };

  const setRandomColor = (colors, input, styleOfElement) => {
    let newColor = getUniqueColor(colors, input);
    if (styleOfElement === fireBallColor) {
      styleOfElement.style.background = newColor;
      fireballInput.value = newColor;
    } else {
      styleOfElement.style.fill = newColor;
      input.value = newColor;
    }
    return newColor;
  };

  const changeCoatColor = () => {
    coatColor = setRandomColor(window.wizardData.COAT_COLORS, wizardCoatInput, wizardCoat);
    window.util.debounce();
  };

  const changeWizardEyesColor = () => {
    eyesColor = setRandomColor(window.wizardData.EYES_COLORS, wizardEyesInput, wizardEyes);
    window.util.debounce();
  };

  const changeFireBallColor = () => setRandomColor(window.wizardData.FIREBALL_COLORS, fireballInput, fireBallColor);

  const addListeners = () => {
    wizardCoat.addEventListener(`click`, changeCoatColor);
    wizardEyes.addEventListener(`click`, changeWizardEyesColor);
    fireBallColor.addEventListener(`click`, changeFireBallColor);
  };

  const removeListener = () => {
    wizardCoat.removeEventListener(`click`, changeCoatColor);
    wizardEyes.removeEventListener(`click`, changeWizardEyesColor);
    fireBallColor.removeEventListener(`click`, changeFireBallColor);
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
})();
