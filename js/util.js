import {submitButton} from './form.js';

const TIME_SHOW_ALERT = 5000;

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = 100;
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = 0;
  alertContainer.style.top = 0;
  alertContainer.style.right = 0;
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, TIME_SHOW_ALERT);
};

const isEscapeKey = (evt) => evt.key === 'Escape';
const outputSuccess = () => {
  const message = document.querySelector('#success').content.querySelector('.success');
  const cloneMessage = message.cloneNode(true);
  document.body.append(cloneMessage);

  const onMessageSuccessClick = () => {
    document.body.removeChild(cloneMessage);
    submitButton.disabled = false;
    submitButton.textContent = 'Опубликовать';
    document.removeEventListener ('click', onMessageSuccessClick);
    document.removeEventListener ('keydown', onMessageSuccessKeydown);
  };

  function onMessageSuccessKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      onMessageSuccessClick();
    }
  }
  document.addEventListener('click', onMessageSuccessClick);

  document.addEventListener('keydown', onMessageSuccessKeydown);
};

const outputError = () => {
  const messageErr = document.querySelector('#error').content.querySelector('.error');
  const cloneMessageErr = messageErr.cloneNode(true);
  document.body.append(cloneMessageErr);

  const onMessageErrorClick = () => {
    document.body.removeChild(cloneMessageErr);
    submitButton.disabled = false;
    submitButton.textContent = 'Опубликовать';
    document.removeEventListener ('click', onMessageErrorClick);
    document.removeEventListener ('keydown', onMessageErrorKeydown);
  };

  function onMessageErrorKeydown(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      onMessageErrorClick();
    }
  }

  document.addEventListener ('click', onMessageErrorClick);

  document.addEventListener ('keydown', onMessageErrorKeydown);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};
export {showAlert, outputSuccess, outputError, debounce};
