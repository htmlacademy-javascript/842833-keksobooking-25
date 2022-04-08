import './generation.js';
import {setAdFormSubmit} from './form.js';
import {similarAd, adformSubmit} from './map.js';
import {showAlert} from './util.js';
import {getData} from './api.js';

const SIMILAR_AD_COUNT = 10;

getData(
  (ads) => similarAd(ads.slice(0, SIMILAR_AD_COUNT)),
  () => showAlert('Не удалось загрузить данные с сервера!'),
);

setAdFormSubmit(adformSubmit);

