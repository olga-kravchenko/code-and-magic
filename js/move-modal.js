'use strict';

(() => {
  const INITIAL_POSITION_TOP = `80px`;
  const INITIAL_POSITION_LEFT = `50%`;
  const modal = document.querySelector(`.setup`);
  const avatar = modal.querySelector(`.upload`);
  let isDragged;
  let startCoordinates;

  const resetPosition = () => {
    modal.style.top = INITIAL_POSITION_TOP;
    modal.style.left = INITIAL_POSITION_LEFT;
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

  const addListeners = () => {
    avatar.addEventListener(`mousedown`, (evt) => {
      evt.preventDefault();
      startCoordinates = {
        x: evt.clientX,
        y: evt.clientY,
      };
      document.addEventListener(`mousemove`, onMouseMove);
      document.addEventListener(`mouseup`, onMouseUp);
    });
  };

  const removeListeners = () => {
    avatar.removeEventListener(`mousedown`, (evt) => {
      evt.preventDefault();
      document.removeEventListener(`mousemove`, onMouseMove);
      document.removeEventListener(`mouseup`, onMouseUp);
    });
  };

  window.moveModal = {
    addListeners,
    removeListeners,
    resetPosition,
  };
})();
