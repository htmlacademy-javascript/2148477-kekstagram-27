const successPopup = document.querySelector('.success');
const successButton = successPopup.querySelector('.success__button');
const failPopup = document.querySelector('.error');
const failButton = failPopup.querySelector('.error__button');

const onSuccessFailAnywhereClick = (evt) => {
  if (evt.target === successPopup || evt.target === failPopup) {
    evt.target.classList.add('hidden');
    document.body.classList.remove('modal-open');

    document.removeEventListener('click', onSuccessFailAnywhereClick);
    document.removeEventListener('keydown', onSuccessFailKeydown);
  }
};

function onSuccessFailKeydown (evt) {
  if (evt.code === 'Escape') {
    if ( !successPopup.classList.contains('hidden') ) {
      successPopup.classList.add('hidden');
      document.body.classList.remove('modal-open');
    } else if ( !failPopup.classList.contains('hidden') ) {
      failPopup.classList.add('hidden');
      document.body.classList.remove('modal-open');
    }

    document.removeEventListener('click', onSuccessFailAnywhereClick);
    document.removeEventListener('keydown', onSuccessFailKeydown);
  }
}

const onSuccessFailButtonClick = (evt) => {
  evt.target.parentNode.parentNode.classList.add('hidden');
  document.body.classList.remove('modal-open');

  document.removeEventListener('click', onSuccessFailAnywhereClick);
  document.removeEventListener('keydown', onSuccessFailKeydown);
};

const showSuccess = () => {
  successPopup.classList.remove('hidden');
  document.body.classList.add('modal-open');

  successButton.addEventListener('click', onSuccessFailButtonClick);
  document.addEventListener('click', onSuccessFailAnywhereClick);
  document.addEventListener('keydown', onSuccessFailKeydown);
};

const showError = () => {
  failPopup.classList.remove('hidden');
  document.body.classList.add('modal-open');

  failButton.addEventListener('click', onSuccessFailButtonClick);
  document.addEventListener('click', onSuccessFailAnywhereClick);
  document.addEventListener('keydown', onSuccessFailKeydown);
};

export {showSuccess, showError};
