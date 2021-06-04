'use strict';

const onSuccess = window.wizardsSetting.renderUpdateWizards;
const onError = window.util.showErrorModal;

window.backend.load(onSuccess, onError);
window.modal.activate();
