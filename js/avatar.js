'use strict';

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];

const fileSelection = document.querySelector(`.upload input[type=file]`);
const avatarPreview = document.querySelector(`.setup-user-pic`);

const reader = new FileReader();

const onReaderLoadChangeUrl = () => {
  avatarPreview.src = reader.result;
};

const onFileSelectionChange = () => {
  const file = fileSelection.files[0];
  const fileName = file.name.toLowerCase();
  reader.readAsDataURL(file);
  const checkEndOfTheName = (type) => fileName.endsWith(type);
  const isMatchingTheFileType = FILE_TYPES.some(checkEndOfTheName);

  if (isMatchingTheFileType) {
    reader.addEventListener(`load`, onReaderLoadChangeUrl);
  }
};

const addListener = () => fileSelection.addEventListener(`change`, onFileSelectionChange);

window.avatar = {
  addListener,
  reader,
  avatarPreview,
};

