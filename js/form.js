// заголовок
const adForm = document.querySelector('.ad-form');
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

adForm.addEventListener('submit', (evt) => {

  const isValid = pristine.validate();
  if (!isValid) {
    evt.preventDefault();
  }
});
// изменение price
const priceHousing = adForm.querySelector('#price');
const housingList = adForm.querySelector('#type');
const housing = adForm.querySelector('#type');
const minPrice = {
  'bungalow': 0,
  'flat': 1000,
  'hotel': 3000,
  'house': 5000,
  'palace': 10000
};

housingList.addEventListener('change', () => {
  const house = housing.value;
  priceHousing.placeholder = minPrice[house];
  priceHousing.min = minPrice[house];
});

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
