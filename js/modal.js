function closeModal(evt) {
  if (evt.code === 'Escape' || evt.type === 'click') {
    this.window.classList.add('hidden');
    document.body.classList.remove('modal-open');

    this.button.removeEventListener('click', this);
    document.removeEventListener('keydown', this);
  }
}

function getCloseButton (modal) {
  return (modal.querySelector('.cancel') || modal.querySelector('.success__button') || modal.querySelector('.error__button'));
}

function openModal(modal) {
  const closeButton = getCloseButton(modal);
  const objListenerCallback = {
    handleEvent: closeModal,
    window: modal,
    button: closeButton,
  };

  closeButton.addEventListener('click', objListenerCallback);
  document.addEventListener('keydown', objListenerCallback);

  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

export {openModal};
