import {adForm, activatePage, slider} from './form.js';
import {getCreateAdCard} from './generation.js';
import {outputSuccess}  from './util.js';
import {getNewArrayAds, formFilter} from './form-filter.js';

const LAT_CITY_TOKIO = 35.68950;
const LNG_CITY_TOKIO = 139.69171;

const buttonReset = adForm.querySelector('.ad-form__reset');
const address = adForm.querySelector('#address');

const map = L.map('map-canvas')
  .on('load', () => {
    activatePage();
  })
  .setView({
    lat: LAT_CITY_TOKIO,
    lng: LNG_CITY_TOKIO,
  },12);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

// создание главной метки

const pinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const oneMarker = L.marker(
  {
    lat: LAT_CITY_TOKIO,
    lng: LNG_CITY_TOKIO,
  },
  {
    draggable: true,
    icon: pinIcon,
  }
);

address.value = `${LAT_CITY_TOKIO  }, ${  LNG_CITY_TOKIO}`;

oneMarker.addTo(map);

oneMarker.on('moveend', (evt) => {
  const latLng = evt.target.getLatLng();
  address.value = `${latLng.lat.toFixed(5)  }, ${  latLng.lng.toFixed(5)}`;
});

// создание "обычных" меток и добавление попавов на карту

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerGroup = L.layerGroup().addTo(map);

const getSimilarAd = (ads)=> {
  markerGroup.clearLayers();

  getNewArrayAds(ads)
    .forEach((ad) => {

      const {location} = ad;
      const marker = L.marker(
        {
          lat: location.lat,
          lng: location.lng,
        },
        {
          icon,
        });
      marker.addTo(markerGroup).bindPopup(getCreateAdCard(ad));
    });
};

export {getSimilarAd};

// возвращение главной метки в исходное положение

const getDefault = () => {
  oneMarker.setLatLng({
    lat: LAT_CITY_TOKIO,
    lng: LNG_CITY_TOKIO,
  });
  formFilter.querySelector('#housing-type').value = 'any';
  formFilter.querySelector('#housing-price').value = 'any';
  formFilter.querySelector('#housing-rooms').value = 'any';
  formFilter.querySelector('#housing-guests').value = 'any';
  const formFilterCheckboxs = formFilter.querySelectorAll('input[type="checkbox"]');
  formFilterCheckboxs.forEach((checkbox) => {
    if (checkbox.checked)
    {checkbox.checked = false;}
  });
  address.value = `${LAT_CITY_TOKIO  }, ${  LNG_CITY_TOKIO}`;
  adForm.querySelector('.ad-form-header__preview-avatar').src = 'img/muffin-grey.svg';
  adForm.querySelector('#title').value = '';
  const adFormErrorItem = adForm.querySelectorAll('.form__error');
  for (let i = 0; i < adFormErrorItem.length; i++) {
    adFormErrorItem[i].style.display = 'none';
  }
  adForm.querySelector('#type').value = 'flat';
  slider.noUiSlider.set(1000);
  adForm.querySelector('#room_number').value = '1';
  adForm.querySelector('#capacity').value = '1';
  adForm.querySelector('#timein').value = '12:00';
  adForm.querySelector('#timeout').value = '12:00';
  const checkboxs = adForm.querySelectorAll('input[type="checkbox"]');
  checkboxs.forEach((checkbox) => {
    if (checkbox.checked)
    {checkbox.checked = false;}
  });
  adForm.querySelector('#description').value = '';
  const photosAd = adForm.querySelector('.ad-form__photo');
  while (photosAd.firstChild) {
    photosAd.removeChild(photosAd.firstChild);
  }
  if (document.querySelector('.leaflet-popup-close-button')) {
    document.querySelector('.leaflet-popup-close-button').click();
  }
};

buttonReset.addEventListener('click', (evt) => {
  evt.preventDefault();
  getDefault();
});

const sendAdForm = () => {
  getDefault();
  outputSuccess();
};

export {sendAdForm};
