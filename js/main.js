function getRandom(x, y) {
  if (Number.isFinite(x) && Number.isFinite(y) && x >= 0 && y >= 0) {
    if (x === y) {
      return Number.isInteger(x) ? x : NaN;
    }

    const min = Math.ceil(Math.min(x, y));
    const max = Math.floor(Math.max(x, y));
    const randomNum = Math.floor(Math.random() * (max - min + 1) + min);
    return (randomNum >= min && randomNum <= max) ? randomNum : null;
  }

  return NaN;
}

function isFits(string, maxLength = 140) {
  return typeof string === 'string' ? string.length <= maxLength : null;
}

getRandom(1.3, 1.7);

isFits('foobar', 2);
