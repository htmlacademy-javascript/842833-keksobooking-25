import {adForm, activePage} from './form.js';
import {analogousAd,createAdCard} from './generation.js';

const buttonReset = adForm.querySelector('.ad-form__reset');
const buttonSubmit = adForm.querySelector('.ad-form__submit');
const address = adForm.querySelector('#address');

const map = L.map('map-canvas')
  .on('load', () => {
    activePage();
  })
  .setView({
    lat: 35.42000,
    lng: 139.25300,
  },8);

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
    lat: 35.42000,
    lng: 139.25300,
  },
  {
    draggable: true,
    icon: pinIcon,
  }
);

address.value = 'lat: 35.42000, lng: 139.25300';

oneMarker.addTo(map);

oneMarker.on('moveend', (evt) => {
  const latLng = evt.target.getLatLng();
  address.value = `lat: ${  latLng.lat.toFixed(5)  }, lng: ${  latLng.lng.toFixed(5)}`;
});

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

// создание "обычных" меток и добавление попавов на карту

analogousAd.forEach((ad) => {

  const {location} = ad;
  const marker = L.marker(
    {
      lat: location.lat,
      lng: location.lng,
    },
    {
      icon,
    });
  marker.addTo(map).bindPopup(createAdCard(ad));
});

// возвращение главной метки в исходное положение

buttonReset.addEventListener('click', () => {
  oneMarker.setLatLng({
    lat: 35.42000,
    lng: 139.25300,
  });
});

buttonSubmit.addEventListener('click', () => {
  oneMarker.setLatLng({
    lat: 35.42000,
    lng: 139.25300,
  });
});
