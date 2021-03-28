'use strict';

var fireballSize = 22;
var getFireballSpeed = function (isMovingLeft) {
  return isMovingLeft ? 2 : 5;
};
var wizardSpeed = 3;
var wizardWidth = 70;
var getWizardHeight = function () {
  return 1.337 * wizardWidth;
};

var getWizardX = (gameFieldWidth) => {
  return (gameFieldWidth - wizardWidth) / 2;
};
var getWizardY = (gameFieldHeight) => {
  return gameFieldHeight / 3;
};
