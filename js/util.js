import {submitButton} from './form.js';

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
  }, 5000);
};

const isEscapeKey = (evt) => evt.key === 'Escape';
const success = () => {
  const message = document.querySelector('#success').content.querySelector('.success');
  const cloneMessage = message.cloneNode(true);
  document.body.append(cloneMessage);

  document.addEventListener('click', closeSuccess);

  document.addEventListener('keydown', closeSuccessKey);

  function closeSuccessKey(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeSuccess();
    }
  }

  function closeSuccess() {
    document.body.removeChild(cloneMessage);
    submitButton.disabled = false;
    submitButton.textContent = 'Опубликовать';
    document.removeEventListener ('click', closeSuccess);
    document.removeEventListener ('keydown', closeSuccessKey);
  }
};

const error = () => {
  const messageErr = document.querySelector('#error').content.querySelector('.error');
  const cloneMessageErr = messageErr.cloneNode(true);
  document.body.append(cloneMessageErr);

  const closeError = () => {
    document.body.removeChild(cloneMessageErr);
    document.removeEventListener ('click', closeError);
    document.removeEventListener ('keydown', closeErrorKey);
  };

  function closeErrorKey(evt) {
    if (isEscapeKey(evt)) {
      evt.preventDefault();
      closeError();
    }
  }

  document.addEventListener ('click', closeError);

  document.addEventListener ('keydown', closeErrorKey);
};

const debounce = (callback, timeoutDelay) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};
export {showAlert, success, error, debounce};
