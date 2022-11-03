import {openModal} from './modal.js';
import {isValid} from './validate-form.js';

const imgUploadForm = document.querySelector('.img-upload__form');
const imgUploadOverlay = document.querySelector('.img-upload__overlay');
const imgUploadInput = document.querySelector('.img-upload__input');
const imgHashtagsInput = document.querySelector('.text__hashtags');
const imgDescriptionInput = document.querySelector('.text__description');
const imgUploadButton = document.querySelector('.img-upload__submit');

imgUploadInput.addEventListener('change', () => {
  openModal(imgUploadOverlay, imgUploadInput, imgHashtagsInput, imgDescriptionInput);

  imgUploadForm.addEventListener('input', onFormFieldsInput);
  // TODO добавить снятие обработчиков при отправке формы
});

function onFormFieldsInput(evt) {
  evt.stopPropagation();

  if ( isValid(imgUploadForm) ) {
    imgUploadButton.removeAttribute('disabled', 'disabled');
  } else {
    imgUploadButton.setAttribute('disabled', 'disabled');
  }
}

export {onFormFieldsInput};
