const ALERT_SHOW_TIME = 5000;

const getRandomInt = (x, y) => {
  if (Number.isFinite(x) && Number.isFinite(y) && x >= 0 && y >= 0) {
    const min = Math.ceil(Math.min(x, y));
    const max = Math.floor(Math.max(x, y));
    const randomInt = Math.floor(Math.random() * (max - min + 1) + min);
    return (randomInt >= min && randomInt <= max) ? randomInt : null;
  }

  return NaN;
};

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  let isTimeout = false;
  return () => {
    if (isTimeout) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(
        () => {
          callback();
          isTimeout = false;
        },
        timeoutDelay
      );
    } else {
      callback();
      isTimeout = true;
      timeoutId = setTimeout(() => (isTimeout = false), timeoutDelay);
    }
  };
};

export {getRandomInt, showAlert, debounce};
