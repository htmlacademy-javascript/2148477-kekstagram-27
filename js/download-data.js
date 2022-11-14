function getPhotosArr(onSuccess) {
  fetch('https://27.javascript.pages.academy/kekstagram/data')
    .then((response) => response.json())
    .then((photoData) => onSuccess(photoData)
    );
}

export {getPhotosArr};
