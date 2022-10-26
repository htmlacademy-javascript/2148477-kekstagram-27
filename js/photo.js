import {getPhotosArr} from './generate-data.js';
import {getBigPicture} from './big-picture.js';
import {getMiniature} from './miniatures.js';

const photoContainer = document.querySelector('.pictures');
const miniatureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const generatedPhotos = getPhotosArr();
const photosListFragment = document.createDocumentFragment();

generatedPhotos.forEach((photoData) => {
  const newPhoto = getMiniature(photoData, miniatureTemplate);

  newPhoto.addEventListener('click', (evt) => {
    evt.preventDefault();
    getBigPicture(photoData);
  });

  photosListFragment.append(newPhoto);
});

photoContainer.append(photosListFragment);
