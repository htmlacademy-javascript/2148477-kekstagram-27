function getPhotosArr(onSuccess, onFail) {
  fetch('https://27.javascript.pages.academy/kekstagram/data')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`${response.status} ${response.statusText}`);
      }
    })
    .then((photoData) => onSuccess(photoData))
    .catch(onFail);
}

export {getPhotosArr};
