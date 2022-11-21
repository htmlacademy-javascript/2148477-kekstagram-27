const CHOSEN_PHOTOS_RANDOM_LENGTH = 10;
const DEBOUNCE_DELAY = 500;

import {getPhotosArr} from './data-download.js';
import {getBigPicture} from './big-picture.js';
import {getMiniature} from './miniatures.js';
import {showAlert, getRandomInt, debounce} from './util.js';
import {getUniqValue} from './cache.js';
import {addListeners} from './img-upload.js';

const photoContainer = document.querySelector('.pictures');
const photoContainerClear = photoContainer.innerHTML;
const miniatureTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');
const chosenPhotosInterface = document.querySelector('.img-filters');
let currentChosenButton = document.querySelector('.img-filters__button--active');

const getPhotosListFragment = (photosArr) => {
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
};

const showChosenPhotos = (photos) => {
  let chosenPhotos = [];
  // photoContainer.querySelectorAll('a.picture').forEach((elem) => elem.remove());

  photoContainer.innerHTML = photoContainerClear;
  addListeners();

  if (currentChosenButton.id === 'filter-default') {
    photoContainer.append(getPhotosListFragment(photos));
  } else if (currentChosenButton.id === 'filter-random') {
    const getRandomPhoto = getUniqValue(getRandomInt, 0, photos.length - 1);
    for (let i = 0; i < CHOSEN_PHOTOS_RANDOM_LENGTH; i++) {
      chosenPhotos.push(photos[getRandomPhoto()]);
    }
    photoContainer.append(getPhotosListFragment(chosenPhotos));
  } else if (currentChosenButton.id === 'filter-discussed') {
    chosenPhotos = photos
      .slice()
      .sort((a, b) => b.comments.length - a.comments.length);
    photoContainer.append(getPhotosListFragment(chosenPhotos));
  }
};

const setChosenPhotos = (cb) => {
  chosenPhotosInterface.addEventListener('click', (evt) => {
    if (evt.target.classList.contains('img-filters__button')) {
      currentChosenButton.classList.remove('img-filters__button--active');
      currentChosenButton = evt.target;
      currentChosenButton.classList.add('img-filters__button--active');
      cb();
    }
  });
};

getPhotosArr(
  (photosData) => {
    chosenPhotosInterface.classList.remove('img-filters--inactive');
    showChosenPhotos(photosData);
    setChosenPhotos(debounce(
      () => showChosenPhotos(photosData),
      DEBOUNCE_DELAY
    ));
  },
  () => showAlert('Не удалось загрузить фотографии'),
);
