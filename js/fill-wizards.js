'use strict';

(() => {
  const MAX_SHOWN_SIMILAR_WIZARD_COUNT = 4;
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
    let wizardShown = [];
    while (wizardShown.length < MAX_SHOWN_SIMILAR_WIZARD_COUNT) {
      const randomNumber = window.util.getRandomNumber(0, wizards.length);
      const wizard = wizards[randomNumber];
      if (!wizardShown.includes(wizard)) {
        wizardShown.push(wizard);
        const newWizard = getWizardDomElement(wizard);
        fragment.appendChild(newWizard);
      }
    }
    similarWizardsList.appendChild(fragment);
    similarWizardsBlock.classList.remove(`hidden`);
    return wizardShown;
  };

  window.fillWizards = {
    fillPageByWizards,
  };
})();
