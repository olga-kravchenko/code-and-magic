'use strict';

var fireballSize = 22;
var getFireballSpeed = (isMovingLeft) => {
  return isMovingLeft ? 2 : 5;
};
var wizardSpeed = 3;
var wizardWidth = 70;
var getWizardHeight = () => {
  return 1.337 * wizardWidth;
};

var getWizardX = (gameFieldWidth) => {
  return (gameFieldWidth - wizardWidth) / 2;
};
var getWizardY = (gameFieldHeight) => {
  return gameFieldHeight / 3;
};
