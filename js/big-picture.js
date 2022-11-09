import {openModal} from './modal.js';

const bigPictureOverlay = document.querySelector('.big-picture');

const commentsList = bigPictureOverlay.querySelector('.social__comments');
const newCommentInput = bigPictureOverlay.querySelector('.social__footer-text');

const moreCommentsButton = bigPictureOverlay.querySelector('.social__comments-loader');
const moreCommentsButtonDisabled = moreCommentsButton.cloneNode(true);
moreCommentsButtonDisabled.style.color = 'lightgrey';
moreCommentsButtonDisabled.style.cursor = 'auto';
moreCommentsButtonDisabled.classList.remove('comments-loader');

const commentsCounterTotal = bigPictureOverlay.querySelector('.comments-count');
const commentsCounterShown = bigPictureOverlay.querySelector('.comments-count-shown');
const commentTemplate = commentsList.querySelector('.social__comment');
const commentsListFragment = document.createDocumentFragment();


function getBigPicture (data) {
  commentsList.innerHTML = '';

  bigPictureOverlay.querySelector('.big-picture__img > img').src = data.url;
  bigPictureOverlay.querySelector('.likes-count').textContent = data.likes;
  commentsCounterShown.textContent = data.comments.length < 5 ? data.comments.length : 5;
  commentsCounterTotal.textContent = data.comments.length;
  bigPictureOverlay.querySelector('.social__caption').textContent = data.description;

  // TODO Добавить обработчик на enter
  if (commentsCounterShown.textContent !== commentsCounterTotal.textContent && bigPictureOverlay.contains(moreCommentsButtonDisabled)) {
    moreCommentsButton.addEventListener('click', onMoreCommentsClick);
    moreCommentsButtonDisabled.replaceWith(moreCommentsButton);
  } else {
    moreCommentsButton.replaceWith(moreCommentsButtonDisabled);
  }

  data.comments.forEach((comment) => {
    const newComment = commentTemplate.cloneNode(true);

    const commentor = newComment.querySelector('.social__picture');
    commentor.src = comment.avatar;
    commentor.alt = comment.name;
    newComment.querySelector('.social__text').textContent = comment.message;

    commentsListFragment.append(newComment);

    if (commentsListFragment.childNodes.length > 5) {
      commentsListFragment.lastChild.classList.add('hidden');
    }
  });

  commentsList.append(commentsListFragment);

  openModal(bigPictureOverlay, newCommentInput);
}

function onMoreCommentsClick () {
  let counter = 0;

  for (const comment of commentsList.childNodes) {
    if (counter % 5 === 0) {
      break;
    } else if (comment.classList.contains('hidden')) {
      comment.classList.remove('hidden');
      counter++;
    }
  }

  commentsCounterShown.textContent = +commentsCounterShown.textContent + counter;

  if (commentsCounterShown.textContent === commentsCounterTotal.textContent) {
    moreCommentsButton.removeEventListener('click', onMoreCommentsClick);
    moreCommentsButton.replaceWith(moreCommentsButtonDisabled);
  }
}

export {getBigPicture, onMoreCommentsClick};
