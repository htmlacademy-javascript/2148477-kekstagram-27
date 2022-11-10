const imgScaleInput = document.querySelector('.scale__control--value');
const previewImage = document.querySelector('.img-upload__preview > img');

let currentScale = parseInt(imgScaleInput.value, 10);

function upScale(max, step) {
  // switch (imgScaleInput.value) {
  //   case '25%':
  //     imgScaleInput.value = '50%';
  //     previewImage.classList.remove('img-upload__preview-scale25');
  //     previewImage.classList.add('img-upload__preview-scale50');
  //     break;
  //   case '50%':
  //     imgScaleInput.value = '75%';
  //     previewImage.classList.remove('img-upload__preview-scale50');
  //     previewImage.classList.add('img-upload__preview-scale75');
  //     break;
  //   case '75%':
  //     imgScaleInput.value = '100%';
  //     previewImage.classList.remove('img-upload__preview-scale75');
  //     previewImage.classList.add('img-upload__preview-scale100');
  //     break;
  //   default:
  //     imgScaleInput.value = '100%';
  //     previewImage.classList.add('img-upload__preview-scale100');
  // }

  currentScale = (currentScale + step > max) ? max : currentScale + step;
  imgScaleInput.value = `${currentScale}%`;
  previewImage.style.transform = `scale(${currentScale / 100})`;
}

function downScale(min, step) {
  // switch (imgScaleInput.value) {
  //   case '100%':
  //     imgScaleInput.value = '75%';
  //     previewImage.classList.remove('img-upload__preview-scale100');
  //     previewImage.classList.add('img-upload__preview-scale75');
  //     break;
  //   case '75%':
  //     imgScaleInput.value = '50%';
  //     previewImage.classList.remove('img-upload__preview-scale75');
  //     previewImage.classList.add('img-upload__preview-scale50');
  //     break;
  //   case '50%':
  //     imgScaleInput.value = '25%';
  //     previewImage.classList.remove('img-upload__preview-scale50');
  //     previewImage.classList.add('img-upload__preview-scale25');
  //     break;
  //   default:
  //     imgScaleInput.value = '25%';
  //     previewImage.classList.add('img-upload__preview-scale25');
  // }

  currentScale = (currentScale - step < min) ? min : currentScale - step;
  imgScaleInput.value = `${currentScale}%`;
  previewImage.style.transform = `scale(${currentScale / 100})`;
}

export {upScale, downScale};
