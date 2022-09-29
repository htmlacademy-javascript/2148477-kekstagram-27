function getRandomInt(x, y) {
  if (Number.isFinite(x) && Number.isFinite(y) && x >= 0 && y >= 0) {
    // if (x === y) {
    //   return Number.isInteger(x) ? x : NaN;
    // }
    //
    // лишняя проверка
    // равные целые округлятся до самих себя
    // равные дробные не пройдут проверку на границы

    const min = Math.ceil(Math.min(x, y));
    const max = Math.floor(Math.max(x, y));
    const randomInt = Math.floor(Math.random() * (max - min + 1) + min);
    return (randomInt >= min && randomInt <= max) ? randomInt : null;
  }

  return NaN;
}

function isFits(string, maxLength = 140) {
  return typeof string === 'string' ? string.length <= maxLength : null;
}

getRandomInt(1.3, 1.7);

isFits('foobar', 2);
