const COMMENTS_TO_SHOW_COUNT = 5;

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

const onMoreCommentsClick = () => {
  const comments = Array.from(commentsList.childNodes);

  comments.some((element, index, array) => {
    if (index > commentsCounterShown.textContent && index % COMMENTS_TO_SHOW_COUNT === 0) {
      commentsCounterShown.textContent = index;
      return true;
    } else if (element.classList.contains('hidden')) {
      element.classList.remove('hidden');
    }
    if (index === array.length - 1) {
      commentsCounterShown.textContent = array.length;
    }
  });

  if (commentsCounterShown.textContent === commentsCounterTotal.textContent) {
    moreCommentsButton.removeEventListener('click', onMoreCommentsClick);
    moreCommentsButton.replaceWith(moreCommentsButtonDisabled);
  }
};

const showBigPicture = (data) => {
  commentsList.innerHTML = '';

  bigPictureOverlay.querySelector('.big-picture__img > img').src = data.url;
  bigPictureOverlay.querySelector('.likes-count').textContent = data.likes;
  commentsCounterShown.textContent = data.comments.length < COMMENTS_TO_SHOW_COUNT ? data.comments.length : COMMENTS_TO_SHOW_COUNT;
  commentsCounterTotal.textContent = data.comments.length;
  bigPictureOverlay.querySelector('.social__caption').textContent = data.description;

  if (commentsCounterShown.textContent !== commentsCounterTotal.textContent) {
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

    if (commentsListFragment.childNodes.length > COMMENTS_TO_SHOW_COUNT) {
      commentsListFragment.lastChild.classList.add('hidden');
    }
  });

  commentsList.append(commentsListFragment);

  openModal(bigPictureOverlay, newCommentInput);
};

export {showBigPicture, onMoreCommentsClick};
