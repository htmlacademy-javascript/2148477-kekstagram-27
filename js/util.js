function getRandomInt(x, y) {
  if (Number.isFinite(x) && Number.isFinite(y) && x >= 0 && y >= 0) {
    const min = Math.ceil(Math.min(x, y));
    const max = Math.floor(Math.max(x, y));
    const randomInt = Math.floor(Math.random() * (max - min + 1) + min);
    return (randomInt >= min && randomInt <= max) ? randomInt : null;
  }

  return NaN;
}

function isStringFits(string, maxLength) {
  return typeof string === 'string' ? string.length <= maxLength : null;
}

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

function openModal(modalSelector) {
  const currentModal = document.querySelector(modalSelector);
  const closeButton = getCloseButton(currentModal);
  const objListenerCallback = {
    handleEvent: closeModal,
    window: currentModal,
    button: closeButton,
  };

  closeButton.addEventListener('click', objListenerCallback);
  document.addEventListener('keydown', objListenerCallback);

  currentModal.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

export {getRandomInt, isStringFits, openModal};
