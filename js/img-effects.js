let currentEffect = 'effects__preview--none';

function toggleEffect(effect, image) {
  if (effect.classList.contains('effects__preview')) {
    image.classList.remove(currentEffect);
    image.classList.add(effect.classList[1]);
    currentEffect = effect.classList[1];
  }
}

export {toggleEffect};
