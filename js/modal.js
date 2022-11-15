import {onFormFieldsInput} from './img-upload.js';
import {onMoreCommentsClick} from './big-picture.js';
import {onFormSubmit} from './data-upload.js';
import {showSuccess, showError} from './success-fail-popup.js';

const sucessPopup = document.querySelector('.success');
const failPopup = document.querySelector('.error');

function closeModal(evt) {
  // TODO разделить обработчик на два klick & keydown
  if (sucessPopup.classList.contains('hidden') && failPopup.classList.contains('hidden') && !evt.target.classList.contains('no-esc') && evt.code === 'Escape' || evt.type === 'click' || evt.type === 'submit') {
    this.window.classList.add('hidden');
    document.body.classList.remove('modal-open');

    this.button.removeEventListener('click', this);
    document.removeEventListener('keydown', this);
    this.form.removeEventListener('input', onFormFieldsInput);
    if (this.window.querySelector('.social__comments-loader')) {
      this.window.querySelector('.social__comments-loader').removeEventListener('click', onMoreCommentsClick);
    }

    for (const input of this.toReset) {
      input.value = '';
    }
  }
}

function getCloseButton (modal) {
  return (modal.querySelector('.cancel') || modal.querySelector('.success__button') || modal.querySelector('.error__button'));
}

function getSubmitButton (modal) {
  return (modal.querySelector('.img-upload__submit'));
}

function openModal(modal, ...inputsToReset) {
  const closeButton = getCloseButton(modal);
  const submitButton = getSubmitButton(modal);
  const objListenerCallback = {
    handleEvent: closeModal,
    window: modal,
    form: modal.parentNode,
    button: closeButton,
    submit: submitButton,
    toReset: inputsToReset,
  };

  closeButton.addEventListener('click', objListenerCallback);
  document.addEventListener('keydown', objListenerCallback);

  if (submitButton) {
    const blockSubmitButton = () => {
      submitButton.disabled = true;
      submitButton.textContent = 'Публикую...';
    };

    const unblockSubmitButton = () => {
      submitButton.disabled = false;
      submitButton.textContent = 'Опубликовать';
    };

    modal.parentNode.addEventListener('submit', (evt) => {
      evt.preventDefault();
      blockSubmitButton();
      onFormSubmit(
        evt.target,
        () => {
          closeModal.bind(objListenerCallback)(evt);
          showSuccess();
          unblockSubmitButton();
        },
        () => {
          showError();
          unblockSubmitButton();
        }
      );
    });
  }

  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

export {openModal};
