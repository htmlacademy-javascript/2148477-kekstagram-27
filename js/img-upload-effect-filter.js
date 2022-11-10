const previewImage = document.querySelector('.img-upload__preview > img');
const effectSliderWrap = document.querySelector('.effect-level__slider');
const effectLevelInput = document.querySelector('.effect-level__value');

let currentEffect = 'effects__preview--none';
let currentStyle = '';
let styleUnits = '';

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

export {toggleEffect};
