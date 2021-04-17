'use strict';

(() => {
  const similarWizardsList = window.modal.popup.querySelector(`.setup-similar-list`);
  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content;

  const getRandomWizards = (quantity) => {
    const wizards = [];
    for (let i = 0; i < quantity; i++) {
      wizards.push({
        name: window.wizardData.NAMES[window.util.getRandomNumber(window.util.MIN_ARRAY_INDEX, window.wizardData.NAMES.length)] + ` ` + window.wizardData.LAST_NAMES[window.util.getRandomNumber(window.util.MIN_ARRAY_INDEX, window.wizardData.LAST_NAMES.length)],
        coatColor: window.wizardData.COAT_COLORS[window.util.getRandomNumber(window.util.MIN_ARRAY_INDEX, window.wizardData.COAT_COLORS.length)],
        eyesColor: window.wizardData.EYES_COLORS[window.util.getRandomNumber(window.util.MIN_ARRAY_INDEX, window.wizardData.EYES_COLORS.length)],
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
})();
