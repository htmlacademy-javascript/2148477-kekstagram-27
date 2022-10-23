import {openModal} from './util.js';

function getBigPicture (data) {
  const bigPictureOverlay = document.querySelector('.big-picture');

  // временно прячем блоки
  bigPictureOverlay.querySelector('.social__comment-count').classList.add('hidden');
  bigPictureOverlay.querySelector('.comments-loader').classList.add('hidden');

  const commentsList = bigPictureOverlay.querySelector('.social__comments');
  const commentTemplate = commentsList.querySelector('.social__comment');
  const commentsListFragment = document.createDocumentFragment();
  commentsList.innerHTML = '';

  bigPictureOverlay.querySelector('.big-picture__img > img').src = data.url;
  bigPictureOverlay.querySelector('.likes-count').textContent = data.likes;
  bigPictureOverlay.querySelector('.comments-count').textContent = data.comments.length;
  bigPictureOverlay.querySelector('.social__caption').textContent = data.description;

  data.comments.forEach((comment) => {
    const newComment = commentTemplate.cloneNode(true);

    const commentor = newComment.querySelector('.social__picture');
    commentor.src = comment.avatar;
    commentor.alt = comment.name;
    newComment.querySelector('.social__text').textContent = comment.message;

    commentsListFragment.append(newComment);
  });

  commentsList.append(commentsListFragment);

  openModal(bigPictureOverlay);
}

export {getBigPicture};
