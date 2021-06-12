'use strict';

const STATUS_CODE_OK = 200;
const TIMEOUT_IN_MS = 10000;

const ServerUrl = {
  SAVE: `https://21.javascript.pages.academy/code-and-magick`,
  LOAD: `https://21.javascript.pages.academy/code-and-magick/data`,
};

const onRequestLoad = (request, onLoad, onError) => {
  if (request.status === STATUS_CODE_OK) {
    onLoad(request.response);
  } else {
    onError(`Статус ответа: ${request.status} ${request.statusText}`);
  }
};

const onRequestError = (onError) => onError(`Произошла ошибка соединения`);
const onRequestTimeout = (onError, timeout) => onError(`Запрос не успел выполниться за ${timeout} мс`);

const sendRequest = (onSuccess, onError, requestMethod, data) => {
  const request = new XMLHttpRequest();
  request.responseType = `json`;
  request.timeout = TIMEOUT_IN_MS;
  request.addEventListener(`load`, () => onRequestLoad(request, onSuccess, onError));
  request.addEventListener(`error`, () => onRequestError(onError));
  request.addEventListener(`timeout`, () => onRequestTimeout(onError, request.timeout));
  const url = requestMethod === `POST` ? ServerUrl.SAVE : ServerUrl.LOAD;
  request.open(requestMethod, url);
  request.send(data);
};

const save = (data, onSuccess, onError) => sendRequest(onSuccess, onError, `POST`, data);
const load = (onSuccess, onError) => sendRequest(onSuccess, onError, `GET`);

window.backend = {
  save,
  load,
};
