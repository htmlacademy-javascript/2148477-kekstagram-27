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

function openModal(modal) {
  const closeButton = modal.querySelector('.cancel');

  function close(evt) {
    modal.classList.add('hidden');
    document.body.classList.remove('modal-open');

    if (evt.code === 'Escape') {
      modal.classList.add('hidden');
      document.body.classList.remove('modal-open');
    }

    closeButton.removeEventListener('click', close);
    document.removeEventListener('keydown', close);
  }

  closeButton.addEventListener('click', close);
  document.addEventListener('keydown', close);

  modal.classList.remove('hidden');
  document.body.classList.add('modal-open');
}

export {getRandomInt, isStringFits, openModal};
