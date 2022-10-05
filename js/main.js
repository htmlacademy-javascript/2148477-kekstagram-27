const POSTED_PHOTOS_COUNT = 25;
const COMMENT_PER_PHOTO_MIN = 2;
const COMMENT_PER_PHOTO_MAX = 6;

const POSTED_COMMENTS_COUNT = POSTED_PHOTOS_COUNT * COMMENT_PER_PHOTO_MAX;

const LOREM_IPSUM = 'Идейные соображения высшего порядка, а также новая модель организационной деятельности позволяет выполнять важные задания по разработке позиций, занимаемых участниками в отношении поставленных задач. Идейные соображения высшего порядка, а также постоянное информационно-пропагандистское обеспечение нашей деятельности требуют от нас анализа дальнейших направлений развития. Задача организации, в особенности же начало повседневной работы по формированию позиции обеспечивает широкому кругу (специалистов) участие в формировании существенных финансовых и административных условий. Товарищи! сложившаяся структура организации представляет собой интересный эксперимент проверки модели развития. Идейные соображения высшего порядка, а также укрепление и развитие структуры позволяет выполнять важные задания по разработке форм развития.';

const COMMENTORS_NAMES = [
  'Хельмут Ньютон',
  'Ричард Аведон',
  'Анри Картье-Бессон',
  'Себастьян Салгаду',
  'Уильям Юджин Смит',
  'Ги Бурден',
  'Виджи',
  'Александр Родченко',
  'Ирвинн Пенн',
  'Антон Корбейн',
  'Стивен Майзел',
  'Диана Арбус',
  'Дэвид Лашапель',
  'Марк Рибу',
  'Эллиот Эрвитт',
  'Патрик Демаршелье',
  'Энни Лейбовиц',
  'Мик Рок',
  'Мартин Парр',
  'Ричард КЕрн',
  'Андреас Гурски'
];

const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

function getRandomInt(x, y) {
  if (Number.isFinite(x) && Number.isFinite(y) && x >= 0 && y >= 0) {
    const min = Math.ceil(Math.min(x, y));
    const max = Math.floor(Math.max(x, y));
    const randomInt = Math.floor(Math.random() * (max - min + 1) + min);
    return (randomInt >= min && randomInt <= max) ? randomInt : null;
  }

  return NaN;
}

function isStringFits(string, maxLength = 140) {
  return typeof string === 'string' ? string.length <= maxLength : null;
}

getRandomInt(1.3, 1.7);

isStringFits('foobar', 2);

const getRandomArrayElement = (elements) => elements[getRandomInt(0, elements.length - 1)];

const postComment = () => ({
  id: getRandomInt(1, POSTED_COMMENTS_COUNT),
  avatar: `img/avatar-${getRandomInt(1, 6)}.svg`, //сгенерировать неповторяющийся
  message: getRandomArrayElement(COMMENTS), //сгенерировать неповторяющийся
  name: getRandomArrayElement(COMMENTORS_NAMES) //сгенерировать неповторяющийся
});

const getCommentsPerPhotoCount = () =>
  getRandomInt(COMMENT_PER_PHOTO_MAX, COMMENT_PER_PHOTO_MIN);

const postPhoto = () => ({
  id: `${getRandomInt(1, POSTED_PHOTOS_COUNT)}`, //сгенерировать неповторяющийся
  url: `photos/${getRandomInt(1, POSTED_PHOTOS_COUNT)}.jpg`, //сгенерировать неповторяющийся
  description: 'lorem ipsum', //cгенерировать description
  likes: getRandomInt(15, 200),
  comments: Array.from({length: getCommentsPerPhotoCount()}, postComment)
});

const postedPhotos = Array.from({length: POSTED_PHOTOS_COUNT}, postPhoto);

console.log(postedPhotos);
