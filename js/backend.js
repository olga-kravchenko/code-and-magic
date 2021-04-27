'use strict';

(() => {
  const STATUS_CODE_OK = 200;
  const TIMEOUT_IN_MS = 10000;
  const URL = {
    SAVE: `https://21.javascript.pages.academy/code-and-magick`,
    LOAD: `https://21.javascript.pages.academy/code-and-magick/data`,
  };

  const onLoadRequest = (request, onLoad, onError) => {
    if (request.status === STATUS_CODE_OK) {
      onLoad(request.response);
    } else {
      onError(`Статус ответа: ` + request.status + ` ` + request.statusText);
    }
  };

  const onErrorRequest = (onError) => {
    onError(`Произошла ошибка соединения`);
  };

  const onTimeoutRequest = (onError, timeout) => {
    onError(`Запрос не успел выполниться за ` + timeout + `мс`);
  };

  const save = (data, onSuccess, onError) => {
    const request = new XMLHttpRequest();
    request.responseType = `json`;
    request.timeout = TIMEOUT_IN_MS;
    request.addEventListener(`load`, () => onLoadRequest(request, onSuccess, onError));
    request.addEventListener(`error`, () => onErrorRequest(onError));
    request.addEventListener(`timeout`, () => onTimeoutRequest(onError, request.timeout));
    request.open(`POST`, URL.SAVE);
    request.send(data);
  };

  const load = (onSuccess, onError) => {
    const request = new XMLHttpRequest();
    request.responseType = `json`;
    request.timeout = TIMEOUT_IN_MS;
    request.addEventListener(`load`, () => onLoadRequest(request, onSuccess, onError));
    request.addEventListener(`error`, () => onErrorRequest(onError));
    request.addEventListener(`timeout`, () => onTimeoutRequest(onError, request.timeout));
    request.open(`GET`, URL.LOAD);
    request.send();
  };

  window.backend = {
    save,
    load,
  };
})();
