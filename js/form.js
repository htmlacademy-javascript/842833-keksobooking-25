import {error}  from './util.js';
import {sendData} from './api.js';
// заголовок

const adForm = document.querySelector('.ad-form');
const submitButton = adForm.querySelector('.ad-form__submit');
export {submitButton, adForm};

const input = adForm.querySelector('#title');

const pristine = new Pristine(adForm, {
  classTo: 'form__item',
  errorTextParent: 'form__item',
  errorTextClass: 'form__error'
});

function validateTitle (value) {
  return value.length > 30 && value.length <= 100;
}

pristine.addValidator(
  input,
  validateTitle
);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const setAdFormSubmit = (onSuccess) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      sendData(
        () => {
          onSuccess();
          blockSubmitButton();
        },
        () => {
          error();
        },
        new FormData(evt.target),
      );
    }
  });
};

export {setAdFormSubmit};

// slider

const priceHousing = adForm.querySelector('#price');
const slider = adForm.querySelector('.ad-form__slider');
const housing = adForm.querySelector('#type');
const minPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 100000,
  },
  start: 5000,
  step: 500,
  connect: 'lower',
  format: {
    to: function (value) {
      return value.toFixed(0);
    },
    from: function (value) {
      return value;
    },
  }
});

housing.addEventListener('change', () => {
  const house = housing.value;
  priceHousing.placeholder = minPrice[house];
  priceHousing.min = minPrice[house];
  slider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 100000,
    },
    start: minPrice[house],
  });
});

slider.noUiSlider.on('update', () => {
  priceHousing.value = slider.noUiSlider.get();
});

priceHousing.addEventListener('change', function () {
  slider.noUiSlider.set(this.value);
});

// изменение price

function validatePrice () {
  return priceHousing.value >= minPrice[housing.value];
}

function priceErrorMessage () {
  return `минимум ${  minPrice[housing.value]}`;
}

pristine.addValidator(
  priceHousing,
  validatePrice,
  priceErrorMessage
);

// изменение в поле время выезда

const timein = adForm.querySelector('#timein');

timein.addEventListener('click', () => {
  adForm.querySelector('#timeout').value = timein.value;
});

// изменение количество комнат и мест

const room = adForm.querySelector('#room_number');
const capacity = adForm.querySelector('#capacity');

const capacityOption = {
  '1': {
    errorText: 'для 1 гостя',
    validValues: ['1']
  },
  '2': {
    errorText: 'для 2 гостей или для 1 гостя',
    validValues: ['1', '2']
  },
  '3': {
    errorText: 'для 3 гостей, для 2 гостей или для 1 гостя',
    validValues: ['1', '2', '3']
  } ,
  '100' : {
    errorText: 'не для гостей',
    validValues: ['0']
  }
};

room.addEventListener('change', () => {
  capacity.value = capacityOption[room.value].validValues[0];
});

function validateCapacity (value) {
  return capacityOption[room.value].validValues.includes(value);
}

function capacityErrorMessage () {
  return `"${  capacityOption[room.value].errorText  }"`;
}

pristine.addValidator(
  capacity,
  validateCapacity,
  capacityErrorMessage
);

// неактивная и активная

const fieldsetAdForm = adForm.querySelectorAll('fieldset');
const mapFormFilters = document.querySelector('.map__filters');
const selectMapFormFilters = mapFormFilters.querySelectorAll('select');

function notActivePage() {
  adForm.classList.add('ad-form--disabled');
  fieldsetAdForm.forEach((element) => {
    element.setAttribute('disabled', true);
  });
  notActiveFormFilters();
}

function notActiveFormFilters() {
  mapFormFilters.classList.add('ad-form--disabled');
  selectMapFormFilters.forEach((element) => {
    element.setAttribute('disabled', true);
  });
}

notActivePage();

function activePage() {
  adForm.classList.remove('ad-form--disabled');
  fieldsetAdForm.forEach((element) => {
    element.removeAttribute('disabled');
  });
  mapFormFilters.classList.remove('ad-form--disabled');
  selectMapFormFilters.forEach((element) => {
    element.removeAttribute('disabled');
  });
}

export {activePage, notActiveFormFilters};


