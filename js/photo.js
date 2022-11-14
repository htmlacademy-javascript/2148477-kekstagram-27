import {getPhotosArr} from './download-data.js';
import {getBigPicture} from './big-picture.js';
import {getMiniature} from './miniatures.js';

const photoContainer = document.querySelector('.pictures');
const miniatureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

function getPhotosListFragment (photosArr) {
  const photosListFragment = document.createDocumentFragment();

  photosArr.forEach((photoData) => {
    const newPhoto = getMiniature(photoData, miniatureTemplate);

    newPhoto.addEventListener('click', (evt) => {
      evt.preventDefault();
      getBigPicture(photoData);
    });

    photosListFragment.append(newPhoto);
  });

  return photosListFragment;
}

function showPhotos(photos) {
  photoContainer.append(getPhotosListFragment(photos));
}

getPhotosArr((photosArr) => showPhotos(photosArr));
