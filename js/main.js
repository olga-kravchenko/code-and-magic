'use strict';

(() => {
  window.modal.activate();
  window.backend.load(window.fillWizards.fillPageByWizards, window.util.showErrorModal);
})();
