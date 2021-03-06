import './generation.js';
import {onAdFormSubmit, deactivateFormFilters} from './form.js';
import {getSimilarAd, sendAdForm} from './map.js';
import {showAlert, debounce} from './util.js';
import {getData} from './api.js';
import {onElementChange} from './form-filter.js';
import './avatar.js';

const RERENDER_DELAY = 500;

const formFilter = document.querySelector('.map__filters');
const housingTypeFilter = formFilter.querySelector('#housing-type');
const housingPriceFilter = formFilter.querySelector('#housing-price');
const housingRoomsFilter = formFilter.querySelector('#housing-rooms');
const housingGuestsFilter = formFilter.querySelector('#housing-guests');
const housingFeaturesFilter = formFilter.querySelector('#housing-features');

getData(
  (ads) => {
    getSimilarAd(ads);
    onElementChange(debounce(
      () => getSimilarAd(ads),
      RERENDER_DELAY), housingTypeFilter);
    onElementChange(debounce(
      () => getSimilarAd(ads),
      RERENDER_DELAY), housingPriceFilter);
    onElementChange(debounce(
      () => getSimilarAd(ads),
      RERENDER_DELAY), housingRoomsFilter);
    onElementChange(debounce(
      () => getSimilarAd(ads),
      RERENDER_DELAY), housingGuestsFilter);
    onElementChange(debounce(
      () => getSimilarAd(ads),
      RERENDER_DELAY), housingFeaturesFilter);
  },
  () => {
    showAlert('Не удалось загрузить данные с сервера!');
    deactivateFormFilters();
  }
);

onAdFormSubmit(sendAdForm);

