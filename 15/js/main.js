import './generation.js';
import {setAdFormSubmit, notActiveFormFilters} from './form.js';
import {getSimilarAd, adformSubmit} from './map.js';
import {showAlert, debounce} from './util.js';
import {getData} from './api.js';
import {setAdType, setAdPrice, setAdRooms, setAdGuests, setAdFeatures} from './formFilter.js';
import './avatar.js';

const RERENDER_DELAY = 500;

getData(
  (ads) => {
    getSimilarAd(ads);
    setAdType(debounce(
      () => getSimilarAd(ads),
      RERENDER_DELAY));
    setAdPrice(debounce(
      () => getSimilarAd(ads),
      RERENDER_DELAY));
    setAdRooms(debounce(
      () => getSimilarAd(ads),
      RERENDER_DELAY));
    setAdGuests(debounce(
      () => getSimilarAd(ads),
      RERENDER_DELAY));
    setAdFeatures(debounce(
      () => getSimilarAd(ads),
      RERENDER_DELAY));
  },
  () => {
    showAlert('Не удалось загрузить данные с сервера!');
    notActiveFormFilters();
  }
);

setAdFormSubmit(adformSubmit);

