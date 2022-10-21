import {getPhotosArr} from './generate-data.js';

const photoContainer = document.querySelector('.pictures');
const photoTemplate = document.querySelector('#picture')
  .content
  .querySelector('.picture');

const photosArr = getPhotosArr();
const photosListFragment = document.createDocumentFragment();

photosArr.forEach(({url, likes, comments}) => {
  const photo = photoTemplate.cloneNode(true);
  photo.querySelector('.picture__img').src = url;
  photo.querySelector('.picture__comments').textContent = comments.length;
  photo.querySelector('.picture__likes').textContent = likes;
  photosListFragment.appendChild(photo);
});

photoContainer.appendChild(photosListFragment);
