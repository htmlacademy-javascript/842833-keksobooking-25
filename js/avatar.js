import {adForm} from './form.js';

const FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];

const fileAvatar = adForm.querySelector('[name="avatar"]');
const preview = adForm.querySelector('.ad-form-header__preview-avatar');
const fileImages = adForm.querySelector('[name="images"]');
const containerPhoto = adForm.querySelector('.ad-form__photo');


fileAvatar.addEventListener('change', () => {
  const file = fileAvatar.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    preview.src = URL.createObjectURL(file);
  }
});

fileImages.addEventListener('change', () => {
  const file = fileImages.files[0];
  const fileName = file.name.toLowerCase();

  const matches = FILE_TYPES.some((it) => fileName.endsWith(it));
  if (matches) {
    const newPhoto = document.createElement('img');
    newPhoto.src = URL.createObjectURL(file);
    newPhoto.width = 70;
    newPhoto.height = 70;
    containerPhoto.append(newPhoto);
  }
});
