'use strict';

const onSuccess = window.wizard.render;
const onError = window.util.showErrorModal;

window.backend.load(onSuccess, onError);
window.modal.activate();
