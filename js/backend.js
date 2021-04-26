'use strict';

(() => {
  const StatusCode = {
    OK: 200,
  };
  const TIMEOUT_IN_MS = 10000;

  const onLoadListener = (request, onLoad, onError) => {
    request.addEventListener(`load`, () => {
      if (request.status === StatusCode.OK) {
        onLoad(request.response);
      } else {
        onError(`Статус ответа: ` + request.status + ` ` + request.statusText);
      }
    });
  };

  const onErrorListeners = (request, onError) => {
    request.addEventListener(`error`, () => {
      onError(`Произошла ошибка соединения`);
    });

    request.addEventListener(`timeout`, () => {
      onError(`Запрос не успел выполниться за ` + request.timeout + `мс`);
    });
    request.timeout = TIMEOUT_IN_MS;
  };

  const save = (data, onLoad, onError) => {
    const request = new XMLHttpRequest();
    request.responseType = `json`;
    const URL = `https://21.javascript.pages.academy/code-and-magick`;

    onLoadListener(request, onLoad, onError);
    onErrorListeners(request, onError);
    request.open(`POST`, URL);
    request.send(data);
  };

  const load = (onLoad, onError) => {
    const request = new XMLHttpRequest();
    request.responseType = `json`;
    const URL = `https://21.javascript.pages.academy/code-and-magick/data`;

    onLoadListener(request, onLoad, onError);
    onErrorListeners(request, onError);
    request.open(`GET`, URL);
    request.send();
  };

  window.backend = {
    save,
    load,
  };
})();
