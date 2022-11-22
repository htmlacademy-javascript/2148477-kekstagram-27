const effect = {
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

let currentEffectClass = 'effects__preview--none';
let currentEffect;
let currentStyleName;
let currentStyleUnits;

const toggleEffect = (chosenRadio, image, slider, input) => {
  if (chosenRadio.classList.contains('effects__preview')) {
    image.classList.remove(currentEffectClass);
    image.classList.add(`effects__preview__${chosenRadio.dataset.effect}`);
    currentEffectClass = `effects__preview__${chosenRadio.dataset.effect}`;
    currentEffect = chosenRadio.dataset.effect;
    currentStyleName = effect[currentEffect].styleName;
    currentStyleUnits = effect[currentEffect].styleUnits;
  }

  if (slider.noUiSlider) {

    if (currentEffect === 'none') {
      slider.noUiSlider.destroy();
      input.value = '';
      image.style.filter = '';
    } else {
      slider.noUiSlider.updateOptions(effect[currentEffect].sliderOptions);
    }

  } else if (chosenRadio.classList.contains('effects__preview')) {
    noUiSlider.create(slider, {
      range: {
        min: 1,
        max: 100,
      },
      step: 1,
      start: 0,
      connect: 'lower',
      format: {
        to: (value) => {
          if (Number.isInteger(value)) {
            return value.toFixed(0);
          }
          return value.toFixed(1);
        },
        from: (value) => value
      },
    });

    slider.noUiSlider.on('update', () => {
      input.value = slider.noUiSlider.get();
      image.style.filter = `${currentStyleName}(${input.value}${currentStyleUnits})`;
    });
  }
};

export {toggleEffect};
