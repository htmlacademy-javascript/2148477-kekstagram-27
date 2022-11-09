const imgScaleSmallerButton = document.querySelector('.scale__control--smaller');
const imgScaleBiggerButton = document.querySelector('.scale__control--bigger');
const imgScaleInput = document.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview > img');

const effectsRadio = document.querySelector('.effects__list');
let currentEffect = 'effects__preview--none';
let currentStyle = '';
let styleUnits = '';

const effectSliderWrap = document.querySelector('.effect-level__slider');
const effectLevelInput = document.querySelector('.effect-level__value');

// scale effects

function upScale() {
  switch (imgScaleInput.value) {
    case '25%':
      imgScaleInput.value = '50%';
      previewImage.classList.remove('img-upload__preview-scale25');
      previewImage.classList.add('img-upload__preview-scale50');
      break;
    case '50%':
      imgScaleInput.value = '75%';
      previewImage.classList.remove('img-upload__preview-scale50');
      previewImage.classList.add('img-upload__preview-scale75');
      break;
    case '75%':
      imgScaleInput.value = '100%';
      previewImage.classList.remove('img-upload__preview-scale75');
      previewImage.classList.add('img-upload__preview-scale100');
      break;
    default:
      imgScaleInput.value = '100%';
      previewImage.classList.add('img-upload__preview-scale100');
  }
}

function downScale() {
  switch (imgScaleInput.value) {
    case '100%':
      imgScaleInput.value = '75%';
      previewImage.classList.remove('img-upload__preview-scale100');
      previewImage.classList.add('img-upload__preview-scale75');
      break;
    case '75%':
      imgScaleInput.value = '50%';
      previewImage.classList.remove('img-upload__preview-scale75');
      previewImage.classList.add('img-upload__preview-scale50');
      break;
    case '50%':
      imgScaleInput.value = '25%';
      previewImage.classList.remove('img-upload__preview-scale50');
      previewImage.classList.add('img-upload__preview-scale25');
      break;
    default:
      imgScaleInput.value = '25%';
      previewImage.classList.add('img-upload__preview-scale25');
  }
}

imgScaleSmallerButton.addEventListener('click', downScale);
imgScaleBiggerButton.addEventListener('click', upScale);

// filter effects

effectsRadio.addEventListener('click', toggleEffect);

function toggleEffect(evt) {
  if (evt.target.classList.contains('effects__preview')) {
    previewImage.classList.remove(currentEffect);
    previewImage.classList.add(evt.target.classList[1]);
    currentEffect = evt.target.classList[1];
  }

  if (!effectSliderWrap.noUiSlider) {
    noUiSlider.create(effectSliderWrap, {
      range: {
        min: 1,
        max: 100,
      },
      step: 1,
      start: 0,
      connect: 'lower',
      format: {
        to: function (value) {
          if (Number.isInteger(value)) {
            return value.toFixed(0);
          }
          return value.toFixed(1);
        },
        from: function (value) {
          return value;
        }
      },
    });

    effectSliderWrap.noUiSlider.on('update', () => {
      effectLevelInput.value = effectSliderWrap.noUiSlider.get();
      previewImage.style.filter = `${currentStyle}(${effectLevelInput.value}${styleUnits})`;
    });
  }

  switch (currentEffect) {
    case 'effects__preview--chrome':
      effectSliderWrap.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        step: 0.1,
        start: 1,
      });
      currentStyle = 'grayscale';
      styleUnits = '';
      break;
    case 'effects__preview--sepia':
      effectSliderWrap.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 1,
        },
        step: 0.1,
        start: 1,
      });
      currentStyle = 'sepia';
      styleUnits = '';
      break;
    case 'effects__preview--marvin':
      effectSliderWrap.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 100,
        },
        step: 1,
        start: 100,
      });
      currentStyle = 'invert';
      styleUnits = '%';
      break;
    case 'effects__preview--phobos':
      effectSliderWrap.noUiSlider.updateOptions({
        range: {
          min: 0,
          max: 3,
        },
        step: 0.1,
        start: 3,
      });
      currentStyle = 'blur';
      styleUnits = 'px';
      break;
    case 'effects__preview--heat':
      effectSliderWrap.noUiSlider.updateOptions({
        range: {
          min: 1,
          max: 3,
        },
        step: 0.1,
        start: 3,
      });
      currentStyle = 'brightness';
      styleUnits = '';
      break;
    default:
      effectSliderWrap.noUiSlider.destroy();
      previewImage.style = '';
      effectLevelInput.value = '';
  }
}
