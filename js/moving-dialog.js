'use strict';

(() => {
  const dialogHandle = window.dialog.modal.querySelector(`.upload`);

  const resetCurrentDialogPosition = () => {
    window.dialog.modal.style.top = `80px`;
    window.dialog.modal.style.left = `50%`;
  };

  dialogHandle.addEventListener(`mousedown`, function (evt) {
    evt.preventDefault();
    let dragged;

    let startCoords = {
      x: evt.clientX,
      y: evt.clientY,
    };

    const onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;
      const shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY,
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };

      window.dialog.modal.style.top = (window.dialog.modal.offsetTop - shift.y) + `px`;
      window.dialog.modal.style.left = (window.dialog.modal.offsetLeft - shift.x) + `px`;
    };

    const onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);

      if (dragged) {
        const onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          dialogHandle.removeEventListener(`click`, onClickPreventDefault);
        };
        dialogHandle.addEventListener(`click`, onClickPreventDefault);
      }
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

  window.movingDialog = {
    resetCurrentDialogPosition,
  };
})();
