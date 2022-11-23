const HASHTAGS_MAX_QUANTITY = 5;
const HASHTAG_MAX_LENGTH = 20;

const getHashtagsArr = (hashtagsStr) => (
  hashtagsStr.toUpperCase()
    .split(' ')
    .filter((hashtag) => hashtag !== '')
);

const validateHashtagUniq = (value) => (
  getHashtagsArr(value)
    .reduce(
      (result, hashtag, index, array) => {
        if (index + 1 < array.length) {
          result = result && !array.includes(hashtag, index + 1);
        }
        return result;
      },
      true,
    )
);

const validateHashtagMaxQuantity = (value) => getHashtagsArr(value).length <= HASHTAGS_MAX_QUANTITY;

const validateHashtagMaxLength = (value) => (
  getHashtagsArr(value).reduce(
    (result, hashtag) => (result && hashtag.length <= HASHTAG_MAX_LENGTH),
    true,
  )
);

const validateHashtagLetters = (value) => (
  getHashtagsArr(value).reduce(
    (result, hashtag) => {
      if (hashtag.length > 1) {
        result = result && !(hashtag.search(/[^А-Яа-яA-Za-zЁё0-9#]+/) + 1);
      }
      return result;
    },
    true
  )
);

const validateHashtagMinLength = (value) => (
  getHashtagsArr(value).reduce(
    (result, hashtag) => {
      if (hashtag.length === 1) {
        result = result && hashtag !== '#';
      }
      return result;
    },
    true
  )
);

const validateHashtagFirstChar = (value) => (
  getHashtagsArr(value).reduce(
    (result, hashtag) => {
      if (hashtag !== '') {
        result = result && hashtag[0] === '#';
      }
      return result;
    },
    true
  )
);

const validateHashtagSpaces = (value) => (
  getHashtagsArr(value).reduce(
    (result, hashtag) => {
      if (hashtag.length > 1) {
        result = result && !hashtag.includes('#', 1);
      }
      return result;
    },
    true
  )
);

const isValid = (form) => {
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
    `Не больее ${HASHTAG_MAX_LENGTH} символов.`
  );

  pristine.addValidator(
    form.querySelector('.text__hashtags'),
    validateHashtagMaxQuantity,
    `Не более ${HASHTAGS_MAX_QUANTITY} хештегов.'`
  );

  pristine.addValidator(
    form.querySelector('.text__hashtags'),
    validateHashtagUniq,
    'Только уникальные хештеги.'
  );

  return pristine.validate();
};

export {isValid};
