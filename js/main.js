'use strict';

(() => {
  const onSuccess = window.fillWizards.fillPageByWizards;
  const onError = window.util.showErrorModal;

  window.backend.load(onSuccess, onError);
  window.modal.activate();
})();
