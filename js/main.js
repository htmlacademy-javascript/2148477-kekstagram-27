const POSTED_PHOTOS_COUNT = 25;

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

const postComment = () => ({});

const postPhoto = () => ({
  id: `${getRandomArrayElement(NAMES)}`, //сгенерировать неповторяющийся
  url: `photos/${getRandomArrayElement}.jpg`, //сгенерировать неповторяющийся
  description: 'lorem ipsum', //cгенерировать description
  likes: getRandomInt(15, 200),
  comments: Array.from({length: getRandomInt(5, 15)}, postComment)
});

const postedPhotos = Array.from({length: POSTED_PHOTOS_COUNT}, postPhoto);

console.log(postedPhotos);

const postedPhoto = {
  id: 1,
  url: 'photos/1.jpg',
  description: 'lorem ipsum',
  likes: 15,
  comments: [
    {
      id: 135,
      avatar: 'img/avatar-6.svg',
      message: 'В целом всё неплохо. Но не всё.',
      name: 'Артём'
    }
  ],
};


