const formFilter = document.querySelector('.map__filters');
const housingTypeFilter = formFilter.querySelector('#housing-type');
const housingPriceFilter = formFilter.querySelector('#housing-price');
const housingRoomsFilter = formFilter.querySelector('#housing-rooms');
const housingGuestsFilter = formFilter.querySelector('#housing-guests');
const housingFeaturesFilter = formFilter.querySelector('#housing-features');
const housingFeaturesFilterList = housingFeaturesFilter.getElementsByTagName('input');

const setTypeHousing = (ad) => housingTypeFilter.value === ad.offer.type || housingTypeFilter.value === 'any';

const setPriceHousing = (ad) => {
  const priceHousingFilter = {
    'any': {min: 0, max: 500000},
    'middle': {min: 10000, max: 50000},
    'low': {min: 0, max: 10000},
    'high': {min: 50000, max: 500000},
  };
  const getTypePriceFilter = housingPriceFilter.value;

  return ad.offer.price >= priceHousingFilter[getTypePriceFilter].min && ad.offer.price <= priceHousingFilter[getTypePriceFilter].max;
};

const setRoomsHousing = (ad) => housingRoomsFilter.value === String(ad.offer.rooms) || housingRoomsFilter.value === 'any';

const setGuestsHousing = (ad) => housingGuestsFilter.value === String(ad.offer.guests) || housingGuestsFilter.value === 'any';

// создание массива Features с выбранными элементами и сравнение его с объявлением

const setFeaturesHousing = (ad) => {
  const setArrayFeatures = () => {
    const arrayFeatures = [];
    for (let i = 0; i < housingFeaturesFilterList.length; i++) {
      if (housingFeaturesFilterList[i].checked) {
        arrayFeatures.push(housingFeaturesFilterList[i].value);
      } else if (arrayFeatures.includes(housingFeaturesFilterList[i].value)) {
        const met = arrayFeatures.indexOf(housingFeaturesFilterList[i].value);
        arrayFeatures.splice(met, 1);
      }
    }

    let num = 0;
    for (let i = 0; i < arrayFeatures.length; i++) {
      if (ad.offer.features === undefined) {
        return num;
      } else if (ad.offer.features.includes(arrayFeatures[i])) {
        num +=1 ;
      }
    }
    return num;
  };

  // проверка на checked
  const checkChecked = () => {
    let num = 0;
    for (let i = 0; i < housingFeaturesFilterList.length; i++) {
      if (housingFeaturesFilterList[i].checked) {
        num +=1 ;
      }
    }
    return num ;
  };
  return checkChecked() < 1 || setArrayFeatures() >= 1;
};

const getNewArrayAds = (ads) => {
  const newArrayAds = [];
  for (let i = 0; i < ads.length; i++) {
    if (setTypeHousing(ads[i]) && setPriceHousing(ads[i]) && setRoomsHousing(ads[i]) &&
    setGuestsHousing(ads[i]) && setFeaturesHousing(ads[i])) {
      newArrayAds.push(ads[i]);
    }
    if (newArrayAds.length === 10) {
      break;
    }
  }
  return newArrayAds;
};

const onElementChange = (cb, element) => {
  element.addEventListener('change', () => {
    cb();
  }
  );
};

export {onElementChange, getNewArrayAds};


