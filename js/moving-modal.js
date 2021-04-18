'use strict';

(() => {
  const INITIAL_POSITION_TOP = `80px`;
  const INITIAL_POSITION_LEFT = `50%`;
  const avatar = window.modal.popup.querySelector(`.upload`);

  const resetModalPosition = () => {
    window.modal.popup.style.top = INITIAL_POSITION_TOP;
    window.modal.popup.style.left = INITIAL_POSITION_LEFT;
  };

  avatar.addEventListener(`mousedown`, (evt) => {
    evt.preventDefault();
    let isDragged;
    let startCoordinates = {
      x: evt.clientX,
      y: evt.clientY,
    };

    const onMouseMove = (moveEvt) => {
      moveEvt.preventDefault();
      isDragged = true;
      const shift = {
        x: startCoordinates.x - moveEvt.clientX,
        y: startCoordinates.y - moveEvt.clientY,
      };
      startCoordinates = {
        x: moveEvt.clientX,
        y: moveEvt.clientY,
      };
      window.modal.popup.style.top = `${window.modal.popup.offsetTop - shift.y}px`;
      window.modal.popup.style.left = `${window.modal.popup.offsetLeft - shift.x}px`;
    };

    const onMouseUp = (upEvt) => {
      upEvt.preventDefault();
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
      if (isDragged) {
        const onClickPreventDefault = (clickEvt) => {
          clickEvt.preventDefault();
          avatar.removeEventListener(`click`, onClickPreventDefault);
        };
        avatar.addEventListener(`click`, onClickPreventDefault);
      }
    };

    document.addEventListener(`mousemove`, onMouseMove);
    document.addEventListener(`mouseup`, onMouseUp);
  });

  window.movingModal = {
    reset: resetModalPosition,
  };
})();
