function getMiniature (data, template) {
  const photo = template.cloneNode(true);

  photo.querySelector('.picture__img').src = data.url;
  photo.querySelector('.picture__comments').textContent = data.comments.length;
  photo.querySelector('.picture__likes').textContent = data.likes;

  return photo;
}

export {getMiniature};
