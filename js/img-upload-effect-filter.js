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
    StyleName: '',
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
    StyleName: 'grayscale',
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
    StyleName: 'sepia',
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
    StyleName: 'invert',
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
    StyleName: 'blur',
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
    StyleName: 'brightness',
    styleUnits: '',
  },
};

function toggleEffect(evt) {
  if (evt.target.classList.contains('effects__preview')) {
    previewImage.classList.remove(currentEffectClass);
    previewImage.classList.add(evt.target.classList[1]);
    currentEffectClass = evt.target.classList[1];
    currentEffect = currentEffectClass.slice(18);
    currentStyleName = EFFECTS_LIBRARY[currentEffect].StyleName;
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
