'use strict';

(() => {
  const MAX_SIMILAR_WIZARD_COUNT = 4;
  const similarWizardsList = window.modal.popup.querySelector(`.setup-similar-list`);
  const similarWizardTemplate = document.querySelector(`#similar-wizard-template`).content;
  const similarWizardsBlock = window.modal.popup.querySelector(`.setup-similar`);

  const getWizardDomElement = (wizard) => {
    const newWizard = similarWizardTemplate.cloneNode(true);
    newWizard.querySelector(`.setup-similar-label`).textContent = wizard.name;
    newWizard.querySelector(`.wizard-coat`).style.fill = wizard.colorCoat;
    newWizard.querySelector(`.wizard-eyes`).style.fill = wizard.colorEyes;
    return newWizard;
  };

  const fillPageByWizards = (wizards) => {
    const fragment = document.createDocumentFragment();
    for (let i = 0; i < MAX_SIMILAR_WIZARD_COUNT; i++) {
      const newWizard = getWizardDomElement(wizards[window.util.getRandomNumber(0, wizards.length)]);
      fragment.appendChild(newWizard);
    }
    similarWizardsList.appendChild(fragment);
    similarWizardsBlock.classList.remove(`hidden`);
  };

  window.backend.load(fillPageByWizards, window.util.errorHandler);
})();
