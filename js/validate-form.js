function isValid(form) {
  const pristine = new Pristine(form, {
    // class of the parent element where the error/success class is added
    classTo: 'img-upload__field-wrapper',
    errorClass: 'has-danger',
    // class of the parent element where error text element is appended
    errorTextParent: 'img-upload__field-wrapper',
    // class of the error text element
    errorTextClass: 'img-upload__error-text',
    errorTextTag: 'span',
  });

  pristine.addValidator(
    form.querySelector('.text__hashtags'),
    validateHashtagFirstChar,
    'Должен начинаться с #.'
  );

  pristine.addValidator(
    form.querySelector('.text__hashtags'),
    validateHashtagMinLength,
    'Не может состоять только из #.'
  );

  pristine.addValidator(
    form.querySelector('.text__hashtags'),
    validateHashtagLetters,
    'Может состоять только из букв и цифр.'
  );

  pristine.addValidator(
    form.querySelector('.text__hashtags'),
    validateHashtagSpaces,
    'Должны разделяться пробелами.'
  );

  pristine.addValidator(
    form.querySelector('.text__hashtags'),
    validateHashtagMaxLength,
    'Не больее 20 символов.'
  );

  pristine.addValidator(
    form.querySelector('.text__hashtags'),
    validateHashtagMaxQuanity,
    'Не более 5 хештегов.'
  );

  pristine.addValidator(
    form.querySelector('.text__hashtags'),
    validateHashtagUniq,
    'Только уникальные хештеги.'
  );

  return pristine.validate();
}

function validateHashtagUniq (value) {
  return getHashtagsArr(value).reduce(
    (result, hashtag, index, array) => {
      if (index + 1 < array.length) {
        result = result && !array.includes(hashtag, index + 1);
      }
      return result;
    },
    true
  );
}

function validateHashtagMaxQuanity (value) {
  return getHashtagsArr(value).length < 6;
}

function validateHashtagMaxLength (value) {
  return getHashtagsArr(value).reduce((result, hashtag) => result && hashtag.length < 21, true);
}

function validateHashtagLetters (value) {
  return getHashtagsArr(value).reduce(
    (result, hashtag) => {
      if (hashtag.length > 1) {
        result = result && !(hashtag.search(/[^А-Яа-яA-Za-zЁё0-9#]+/) + 1);
      }
      return result;
    },
    true
  );
}

function validateHashtagMinLength(value) {
  return getHashtagsArr(value).reduce(
    (result, hashtag) => {
      if (hashtag.length === 1) {
        result = result && hashtag !== '#';
      }
      return result;
    },
    true
  );
}

function validateHashtagFirstChar (value) {
  return getHashtagsArr(value).reduce(
    (result, hashtag) => {
      if (hashtag !== '') {
        result = result && hashtag[0] === '#';
      }
      return result;
    },
    true
  );
}

function validateHashtagSpaces (value) {
  return getHashtagsArr(value).reduce(
    (result, hashtag) => {
      if (hashtag.length > 1) {
        result = result && !hashtag.includes('#', 1);
      }
      return result;
    },
    true
  );
}

function getHashtagsArr(hashtagsStr) {
  return hashtagsStr.toUpperCase().split(' ');
}

export {isValid};
