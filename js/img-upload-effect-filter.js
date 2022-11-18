const previewImage = document.querySelector('.img-upload__preview > img');
const effectSliderWrap = document.querySelector('.effect-level__slider');
const effectLevelInput = document.querySelector('.effect-level__value');

let currentEffectClass = 'effects__preview--none';
let currentEffect;
let currentStyleName;
let currentStyleUnits;

const EFFECTS_LIBRARY = {
  none: {
    sliderOptions: {
      range: {
        min: 0,
        max: 100,
      },
      step: 1,
      start: 1,
    },
    styleName: '',
    styleUnits: '',
  },
  chrome: {
    sliderOptions: {
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
      start: 1,
    },
    styleName: 'grayscale',
    styleUnits: '',
  },
  sepia: {
    sliderOptions: {
      range: {
        min: 0,
        max: 1,
      },
      step: 0.1,
      start: 1,
    },
    styleName: 'sepia',
    styleUnits: '',
  },
  marvin: {
    sliderOptions: {
      range: {
        min: 0,
        max: 100,
      },
      step: 1,
      start: 100,
    },
    styleName: 'invert',
    styleUnits: '%',
  },
  phobos: {
    sliderOptions: {
      range: {
        min: 0,
        max: 3,
      },
      step: 0.1,
      start: 3,
    },
    styleName: 'blur',
    styleUnits: 'px',
  },
  heat: {
    sliderOptions: {
      range: {
        min: 1,
        max: 3,
      },
      step: 0.1,
      start: 3,
    },
    styleName: 'brightness',
    styleUnits: '',
  },
};

function toggleEffect(evt) {
  if (evt.target.classList.contains('effects__preview')) {
    previewImage.classList.remove(currentEffectClass);
    previewImage.classList.add(`effects__preview__${evt.target.dataset.effect}`);
    currentEffectClass = `effects__preview__${evt.target.dataset.effect}`;
    currentEffect = evt.target.dataset.effect;
    currentStyleName = EFFECTS_LIBRARY[currentEffect].styleName;
    currentStyleUnits = EFFECTS_LIBRARY[currentEffect].styleUnits;
  }

  if (effectSliderWrap.noUiSlider) {

    if (currentEffect === 'none') {
      effectSliderWrap.noUiSlider.destroy();
      effectLevelInput.value = '';
      previewImage.style.filter = '';
    } else {
      effectSliderWrap.noUiSlider.updateOptions(EFFECTS_LIBRARY[currentEffect].sliderOptions);
    }

  } else if (evt.target.classList.contains('effects__preview')) {
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
      previewImage.style.filter = `${currentStyleName}(${effectLevelInput.value}${currentStyleUnits})`;
    });
  }
}

export {toggleEffect};