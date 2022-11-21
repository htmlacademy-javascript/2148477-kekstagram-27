import {onFormFieldsInput} from './img-upload.js';
import {onMoreCommentsClick} from './big-picture.js';
import {uploadData} from './data-upload.js';
import {showSuccess, showError} from './success-fail-popup.js';

const sucessPopup = document.querySelector('.success');
const failPopup = document.querySelector('.error');

const closeModal = function (evt) {
  if (sucessPopup.classList.contains('hidden') && failPopup.classList.contains('hidden') && !evt.target.classList.contains('no-esc') && evt.code === 'Escape' || evt.type === 'click' || evt.type === 'submit') {
    this.window.classList.add('hidden');
    document.body.classList.remove('modal-open');

    this.button.removeEventListener('click', this);
    document.removeEventListener('keydown', this);
    this.form.removeEventListener('input', onFormFieldsInput);
    if (this.window.querySelector('.social__comments-loader')) {
      this.window.querySelector('.social__comments-loader').removeEventListener('click', onMoreCommentsClick);
    }

    for (const input of this.reset) {
      input.value = '';
    }
  }
};

const getCloseButton = (modal) => ( modal.querySelector('.cancel') || modal.querySelector('.success__button') || modal.querySelector('.error__button') );

const getSubmitButton = (modal) => modal.querySelector('.img-upload__submit');

const openModal = (modal, ...inputsToReset) => {
  const closeButton = getCloseButton(modal);
  const submitButton = getSubmitButton(modal);
  const onCloseModal = {
    handleEvent: closeModal,
    window: modal,
    form: modal.parentNode,
    button: closeButton,
    submit: submitButton,
    reset: inputsToReset,
  };

  closeButton.addEventListener('click', onCloseModal);
  document.addEventListener('keydown', onCloseModal);

  if (submitButton) {
    const blockSubmitButton = () => {
      submitButton.disabled = true;
      submitButton.textContent = 'Публикую...';
    };

    const unblockSubmitButton = () => {
      submitButton.disabled = false;
      submitButton.textContent = 'Опубликовать';
    };

    const onFormSubmit = (evt) => {
      evt.preventDefault();
      blockSubmitButton();
      evt.target.removeEventListener('submit', onFormSubmit);
      uploadData(
        evt.target,
        () => {
          closeModal.bind(onCloseModal)(evt);
          showSuccess();
          unblockSubmitButton();
        },
        () => {
          showError();
          unblockSubmitButton();
        }
      );
    };

    modal.parentNode.addEventListener('submit', onFormSubmit);
  }

  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');
};

export {openModal};
