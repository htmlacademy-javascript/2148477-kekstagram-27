const imgScaleInput = document.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview > img');

function upScale(max, step) {
  const newScale = (parseInt(imgScaleInput.value, 10) + step > max) ? max : parseInt(imgScaleInput.value, 10) + step;
  imgScaleInput.value = `${newScale}%`;
  previewImage.style.transform = `scale(${newScale / 100})`;
}

function downScale(min, step) {
  const newScale = (parseInt(imgScaleInput.value, 10) - step < min) ? min : parseInt(imgScaleInput.value, 10) - step;
  imgScaleInput.value = `${newScale}%`;
  previewImage.style.transform = `scale(${newScale / 100})`;
}

export {upScale, downScale};
