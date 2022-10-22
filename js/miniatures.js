import {getPhotosArr} from './generate-data.js';
import {getBigPicture} from './big-picture.js';

const photoContainer = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const photosArr = getPhotosArr();
const photosListFragment = document.createDocumentFragment();

photosArr.forEach((photoData) => {
  const photo = photoTemplate.cloneNode(true);
  photo.querySelector('.picture__img').src = photoData.url;
  photo.querySelector('.picture__comments').textContent = photoData.comments.length;
  photo.querySelector('.picture__likes').textContent = photoData.likes;
  photo.addEventListener('click', (evt) => {
    evt.preventDefault();
    getBigPicture(photoData);
  });
  photosListFragment.append(photo);
});

photoContainer.append(photosListFragment);
