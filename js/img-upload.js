const SCALE_MIN = 25;
const SCALE_MAX = 100;
const SCALE_STEP = 25;
const SCALE_DEFAULT = 100;

import {upScale, downScale} from './img-upload-effect-scale.js';
import {toggleEffect} from './img-upload-effect-filter.js';
import {openModal} from './modal.js';
import {isValid} from './validate-form.js';

const fileTypes = ['jpg', 'jpeg', 'png'];

let imgUploadForm;
let imgUploadOverlay;
let imgUploadInput;
let imgHashtagsInput;
let imgDescriptionInput;
let imgUploadButton;
let previewImage;
let imgScaleSmallerButton;
let imgScaleBiggerButton;
let effectSliderWrap;
let effectsRadio;
let imgScaleInput;
let effectLevelInput;
let effectsRadioNone;

const renewElements = () => {
  imgUploadForm = document.querySelector('.img-upload__form');
  imgUploadOverlay = document.querySelector('.img-upload__overlay');
  imgUploadInput = document.querySelector('.img-upload__input');
  imgHashtagsInput = document.querySelector('.text__hashtags');
  imgDescriptionInput = document.querySelector('.text__description');
  imgUploadButton = document.querySelector('.img-upload__submit');
  previewImage = document.querySelector('.img-upload__preview > img');
  imgScaleSmallerButton = document.querySelector('.scale__control--smaller');
  imgScaleBiggerButton = document.querySelector('.scale__control--bigger');
  effectSliderWrap = document.querySelector('.effect-level__slider');
  effectLevelInput = document.querySelector('.effect-level__value');
  effectsRadio = document.querySelector('.effects__list');
  effectsRadioNone = document.querySelector('#effect-none');
  imgScaleInput = document.querySelector('.scale__control--value');
};

const onFormFieldsInput = () => {
  if ( isValid(imgUploadForm) ) {
    imgUploadButton.removeAttribute('disabled');
  } else {
    imgUploadButton.setAttribute('disabled', true);
  }
};

const onImgUploadInputChange = () => {
  openModal(imgUploadOverlay, imgUploadInput, imgHashtagsInput, imgDescriptionInput, effectLevelInput);
  previewImage.classList = '';
  previewImage.classList.add('effects__preview--none');
  previewImage.style.transform = `scale(${SCALE_DEFAULT / 100})`;
  previewImage.style.filter = '';
  imgScaleInput.value = `${SCALE_DEFAULT}%`;
  effectsRadioNone.checked = true;

  const imageFile = imgUploadInput.files[0];
  const imageFileName = imageFile.name.toLowerCase();
  const isAllowedType = fileTypes.some( (it) => imageFileName.endsWith(it) );

  if (isAllowedType) {
    previewImage.src = URL.createObjectURL(imageFile);
  }

  imgUploadForm.addEventListener('change', onFormFieldsInput);
  imgUploadForm.addEventListener('input', onFormFieldsInput);

  if (effectSliderWrap.noUiSlider) {
    effectSliderWrap.noUiSlider.destroy();
  }

  effectsRadio.addEventListener('click', (evt) => toggleEffect(evt.target, previewImage, effectSliderWrap, effectLevelInput));
};

const addListeners = () => {
  renewElements();

  imgScaleSmallerButton.addEventListener('click', () => {downScale(SCALE_MIN, SCALE_STEP, previewImage, imgScaleInput);});
  imgScaleBiggerButton.addEventListener('click', () => {upScale(SCALE_MAX, SCALE_STEP, previewImage, imgScaleInput);});

  imgUploadInput.addEventListener('change', onImgUploadInputChange);
};

export {onFormFieldsInput, addListeners};
