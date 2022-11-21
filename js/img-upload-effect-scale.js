const onUpscaleClick = (max, step, image, input) => {
  const newScale = (parseInt(input.value, 10) + step > max) ? max : parseInt(input.value, 10) + step;
  input.value = `${newScale}%`;
  image.style.transform = `scale(${newScale / 100})`;
};

const onDownscaleClick = (min, step, image, input) => {
  const newScale = (parseInt(input.value, 10) - step < min) ? min : parseInt(input.value, 10) - step;
  input.value = `${newScale}%`;
  image.style.transform = `scale(${newScale / 100})`;
};

export {onUpscaleClick, onDownscaleClick};
