import {outputError}  from './util.js';
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

const validateTitle = (value) => value.length > 30 && value.length <= 100;

pristine.addValidator(
  input,
  validateTitle
);

const blockSubmitButton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Публикую...';
};

const onAdFormSubmit = (onSuccess) => {
  adForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitButton();
      sendData(
        () => {
          onSuccess();
        },
        () => {
          outputError();
        },
        new FormData(evt.target),
      );
    }
  });
};

export {onAdFormSubmit};

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
});

slider.noUiSlider.on('update', () => {
  priceHousing.value = slider.noUiSlider.get();
});

priceHousing.addEventListener('change', function () {
  slider.noUiSlider.set(this.value);
});


export {slider};

// изменение price

const validatePrice = () => priceHousing.value >= minPrice[housing.value];

const outputPriceErrorMessage = () => `минимум ${  minPrice[housing.value]}`;

pristine.addValidator(
  priceHousing,
  validatePrice,
  outputPriceErrorMessage
);

// изменение в поле время выезда

const timein = adForm.querySelector('#timein');
const timeout = adForm.querySelector('#timeout');

timein.addEventListener('click', () => {
  timeout.value = timein.value;
});

timeout.addEventListener('click', () => {
  timein.value = timeout.value;
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

const validateCapacity = (value) => capacityOption[room.value].validValues.includes(value);

const outputCapacityErrorMessage = () => `"${  capacityOption[room.value].errorText  }"`;

pristine.addValidator(
  capacity,
  validateCapacity,
  outputCapacityErrorMessage
);

// неактивная и активная

const fieldsetAdForm = adForm.querySelectorAll('fieldset');
const mapFormFilters = document.querySelector('.map__filters');
const selectMapFormFilters = mapFormFilters.querySelectorAll('select');

const deactivateFormFilters = () => {
  mapFormFilters.classList.add('ad-form--disabled');
  selectMapFormFilters.forEach((element) => {
    element.setAttribute('disabled', true);
  });
};

const deactivatePage = () => {
  adForm.classList.add('ad-form--disabled');
  fieldsetAdForm.forEach((element) => {
    element.setAttribute('disabled', true);
  });
  deactivateFormFilters();
};

deactivatePage();

const activatePage = () => {
  adForm.classList.remove('ad-form--disabled');
  fieldsetAdForm.forEach((element) => {
    element.removeAttribute('disabled');
  });
  mapFormFilters.classList.remove('ad-form--disabled');
  selectMapFormFilters.forEach((element) => {
    element.removeAttribute('disabled');
  });
};

export {activatePage, deactivateFormFilters};


