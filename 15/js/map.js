import {adForm, activePage} from './form.js';
import {getCreateAdCard} from './generation.js';
import {success}  from './util.js';
import {setPriceHousing, setTypeHousing, setRoomsHousing, setGuestsHousing, setFeaturesHousing} from './formFilter.js';

// , setFeaturesHousing
const buttonReset = adForm.querySelector('.ad-form__reset');
const address = adForm.querySelector('#address');

const map = L.map('map-canvas')
  .on('load', () => {
    activePage();
  })
  .setView({
    lat: 35.68950,
    lng: 139.69171,
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
    lat: 35.68950,
    lng: 139.69171,
  },
  {
    draggable: true,
    icon: pinIcon,
  }
);

address.value = 'lat: 35.68950, lng: 139.69171';

oneMarker.addTo(map);

oneMarker.on('moveend', (evt) => {
  const latLng = evt.target.getLatLng();
  address.value = `lat: ${  latLng.lat.toFixed(5)  }, lng: ${  latLng.lng.toFixed(5)}`;
});

// создание "обычных" меток и добавление попавов на карту

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const markerGroup = L.layerGroup().addTo(map);
const SIMILAR_AD_COUNT = 10;

const getSimilarAd = (ads)=> {
  markerGroup.clearLayers();

  ads
    .filter(setTypeHousing)
    .filter(setPriceHousing)
    .filter(setRoomsHousing)
    .filter(setGuestsHousing)
    .filter(setFeaturesHousing)
    .slice(0, SIMILAR_AD_COUNT)
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

buttonReset.addEventListener('click', () => {
  oneMarker.setLatLng({
    lat: 35.68950,
    lng: 139.69171,
  });
  address.value = 'lat: 35.68950, lng: 139.69171';
});

const adformSubmit = () => {
  oneMarker.setLatLng({
    lat: 35.68950,
    lng: 139.69171,
  });
  address.value = 'lat: 35.42000, lng: 139.25300';
  adForm.querySelector('#avatar').value = '';
  adForm.querySelector('#title').value = '';
  adForm.querySelector('#type').value = 'flat';
  const checkboxs = adForm.querySelectorAll('input[type="checkbox"]');
  checkboxs.forEach((checkbox) => {
    if (checkbox.checked)
    {checkbox.checked = false;}
  });
  adForm.querySelector('#description').value = '';
  adForm.querySelector('#images').value = '';
  success();
};

export {adformSubmit};
