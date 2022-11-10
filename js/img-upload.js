import {upScale, downScale, toggleEffect} from './img-upload-effects.js';
import {openModal} from './modal.js';
import {isValid} from './validate-form.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgHashtagsInput = document.querySelector('.text__hashtags');
const imgDescriptionInput = document.querySelector('.text__description');
const imgUploadButton = document.querySelector('.img-upload__submit');
const previewImage = document.querySelector('.img-upload__preview > img');
const imgScaleSmallerButton = document.querySelector('.scale__control--smaller');
const imgScaleBiggerButton = document.querySelector('.scale__control--bigger');
const effectsRadio = document.querySelector('.effects__list');

imgUploadInput.addEventListener('change', () => {
  openModal(imgUploadOverlay, imgUploadInput, imgHashtagsInput, imgDescriptionInput);
  previewImage.classList = '';
  previewImage.classList.add('effects__preview--none', 'img-upload__preview-scale100');

  imgUploadForm.addEventListener('input', onFormFieldsInput);
  // TODO добавить снятие обработчиков при отправке формы

  imgScaleSmallerButton.addEventListener('click', downScale);
  imgScaleBiggerButton.addEventListener('click', upScale);
  effectsRadio.addEventListener('click', toggleEffect);
});

function onFormFieldsInput() {
  if ( isValid(imgUploadForm) ) {
    imgUploadButton.removeAttribute('disabled');
  } else {
    imgUploadButton.setAttribute('disabled', true);
  }
}

export {onFormFieldsInput};
