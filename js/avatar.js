'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const avatar = document.querySelector(`.setup-open-icon`);
const fileSelection = document.querySelector(`.upload input[type=file]`);
const avatarPreview = document.querySelector(`.setup-user-pic`);

const reader = new FileReader();

const changeAvatarSrc = () => {
  avatarPreview.src = reader.result;
  avatar.src = reader.result;
};

const newAvatar = () => {
  const file = fileSelection.files[0];
  const fileName = file.name.toLowerCase();

  const matchingTypes = FILE_TYPES.some((type) => {
    return fileName.endsWith(type);
  });

  if (matchingTypes) {
    reader.addEventListener(`load`, changeAvatarSrc);
    reader.readAsDataURL(file);
  }
};

const addListener = () => {
  fileSelection.addEventListener(`change`, newAvatar);
};

window.avatar = {
  addListener,
};

