import {onFormFieldsInput} from './img-upload.js';
import {onMoreCommentsClick} from './big-picture.js';

function closeModal(evt) {
  // TODO разделить обработчик на два klick & keydown
  if (!evt.target.classList.contains('no-esc') && evt.code === 'Escape' || evt.type === 'click') {
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

function openModal(modal, ...inputsToReset) {
  const closeButton = getCloseButton(modal);
  const objListenerCallback = {
    handleEvent: closeModal,
    window: modal,
    form: modal.parentNode,
    button: closeButton,
    toReset: inputsToReset,
  };

  closeButton.addEventListener('click', objListenerCallback);
  document.addEventListener('keydown', objListenerCallback);

  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

export {openModal};
