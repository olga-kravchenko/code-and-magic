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

  const sendRequest = (onSuccess, onError, requestMethod, data) => {
    const request = new XMLHttpRequest();
    request.responseType = `json`;
    request.timeout = TIMEOUT_IN_MS;
    request.addEventListener(`load`, () => onLoadRequest(request, onSuccess, onError));
    request.addEventListener(`error`, () => onErrorRequest(onError));
    request.addEventListener(`timeout`, () => onTimeoutRequest(onError, request.timeout));
    const url = requestMethod === `POST` ? URL.SAVE : URL.LOAD;
    request.open(requestMethod, url);
    request.send(data);
  };

  const save = (data, onSuccess, onError) => {
    sendRequest(onSuccess, onError, `POST`, data);
  };

  const load = (onSuccess, onError) => {
    sendRequest(onSuccess, onError, `GET`);
  };

  window.backend = {
    save,
    load,
  };
})();
