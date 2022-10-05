const POSTED_PHOTOS_COUNT = 25;
const COMMENT_PER_PHOTO_MIN = 2;
const COMMENT_PER_PHOTO_MAX = 6;
const DESCRIPTION_LENGTH = 140;
const POSTED_COMMENTS_COUNT = POSTED_PHOTOS_COUNT * COMMENT_PER_PHOTO_MAX;

const LOREM_IPSUM = 'Идейные соображения высшего порядка, а также укрепление и развитие структуры представляет собой интересный эксперимент проверки систем массового участия. Идейные соображения высшего порядка, а также постоянный количественный рост и сфера нашей активности представляет собой интересный эксперимент проверки форм развития. Повседневная практика показывает, что сложившаяся структура организации позволяет выполнять важные задания по разработке модели развития. Идейные соображения высшего порядка, а также начало повседневной работы по формированию позиции представляет собой интересный эксперимент проверки направлений прогрессивного развития. Равным образом постоянное информационно-пропагандистское обеспечение нашей деятельности позволяет оценить значение новых предложений. Задача организации, в особенности же укрепление и развитие структуры требуют от нас анализа дальнейших направлений развития. С другой стороны начало повседневной работы по формированию позиции позволяет оценить значение модели развития. Значимость этих проблем настолько очевидна, что сложившаяся структура организации способствует подготовки и реализации модели развития. Задача организации, в особенности же постоянный количественный рост и сфера нашей активности требуют определения и уточнения новых предложений. Задача организации, в особенности же начало повседневной работы по формированию позиции обеспечивает широкому кругу (специалистов) участие в формировании направлений прогрессивного развития. Равным образом укрепление и развитие структуры в значительной степени обуславливает создание направлений прогрессивного развития. Повседневная практика показывает, что новая модель организационной деятельности способствует подготовке и реализации направлений прогрессивного развития. Таким образом укрепление и развитие структуры требуют от нас анализа соответствующий условий активизации. Повседневная практика показывает, что укрепление и развитие структуры позволяет оценить значение модели развития. Товарищи! постоянное информационно-пропагандистское обеспечение нашей деятельности позволяет оценить значение систем массового участия. С другой стороны реализация намеченных плановых заданий способствует подготовке и реализации соответствующий условий активизации.';

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
  'Ричард Керн',
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

function isStringFits(string, maxLength) {
  return typeof string === 'string' ? string.length <= maxLength : null;
}

// function getRandomArrayElement(elements) {
//   return elements[getRandomInt(0, elements.length - 1)];
// }

const uniqIds = Array.from({length: POSTED_PHOTOS_COUNT}, (x, y) => ({id: y + 1, used: false}));
const uniqPhotoIds = Array.from({length: POSTED_PHOTOS_COUNT}, (x, y) => ({id: y + 1, used: false}));
const uniqCommentIds = Array.from({length: POSTED_COMMENTS_COUNT}, (x, y) => ({id: y + 1, used: false}));

function postPhoto() {
  function getDescription (text, maxLength) {
    const string = `${text.split('. ')[ getRandomInt(0, text.split('. ').length - 1) ]}.`;
    return isStringFits(string, maxLength) ? string : `${string.slice(0, maxLength - 2)}.`;
  }

  function getUniq(arrUnics) {
    let index = getRandomInt(0, arrUnics.length - 1);
    // if (arrUnics[index].notUsed) {
    //   arrUnics[index].notUsed = false;
    //   return arrUnics[index].id;
    // } else {
    //   return getUniq(arrUnics);
    // }
    // кажется, что перевызов функции - это не очень хорошо.

    while (arrUnics[index].used) {
      index = getRandomInt(0, arrUnics.length - 1);
    }
    arrUnics[index].used = true;
    return arrUnics[index].id;
  }

  function getCommentsCount() {
    return getRandomInt(COMMENT_PER_PHOTO_MAX, COMMENT_PER_PHOTO_MIN);
  }

  const uniqAvatarIds = Array.from({length: COMMENT_PER_PHOTO_MAX}, (x, y) => ({id: y + 1, used: false}));
  const uniqComents = Array.from({length: COMMENTS.length}, (x, y) => ({id: COMMENTS[y], used: false}));
  const uniqComentorsNames = Array.from({length: COMMENTORS_NAMES.length}, (x, y) => ({id: COMMENTORS_NAMES[y], used: false}));

  function postComment() {
    return {
      id: getUniq(uniqCommentIds),
      avatar: `img/avatar-${getUniq(uniqAvatarIds)}.svg`,
      message: getUniq(uniqComents),
      name: getUniq(uniqComentorsNames)
    };
  }

  return {
    id: getUniq(uniqIds),
    url: `photos/${getUniq(uniqPhotoIds)}.jpg`,
    description: getDescription(LOREM_IPSUM, DESCRIPTION_LENGTH),
    likes: getRandomInt(15, 200),
    comments: Array.from({length: getCommentsCount()}, postComment)
  };
}

const postedPhotos = Array.from({length: POSTED_PHOTOS_COUNT}, postPhoto);
