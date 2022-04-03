import {similarAd} from './data.js';

const card = document.querySelector('#card').content.querySelector('.popup');

const analogousAd = similarAd();

analogousAd.forEach ((ad) => {
  const cloneCard = card.cloneNode(true);
  cloneCard.querySelector('.popup__avatar').src = ad.author.avatar;
  cloneCard.querySelector('.popup__title').textContent = ad.offer.title;
  cloneCard.querySelector('.popup__text--address').textContent = ad.offer.address;
  cloneCard.querySelector('.popup__text--price').textContent = `${ad.offer.price  } ₽/ночь`;
  cloneCard.querySelector('.popup__text--capacity').textContent = `${ad.offer.rooms  } комнаты для ${  ad.offer.guests  } гостей`;
  cloneCard.querySelector('.popup__text--time').textContent = `Заезд после ${  ad.offer.checkin  }, выезд до ${ ad.offer.checkout}`;

  const featuresContainer = cloneCard.querySelector('.popup__features');
  const featuresList = featuresContainer.querySelectorAll('.popup__feature');
  const modifiers = ad.offer.features.map((feature) => `popup__feature--${  feature}`);
  featuresList.forEach((featuresListItem) => {
    const modifier = featuresListItem.classList[1];

    if (!modifiers.includes(modifier)) {
      featuresListItem.remove();
    }
  });
  cloneCard.querySelector('.popup__description').textContent = ad.offer.description;
  const photosAd = cloneCard.querySelector('.popup__photos');
  const photoAd = cloneCard.querySelector('.popup__photo');

  ad.offer.photos.forEach((photo) => {
    const clonePhoto = photoAd.cloneNode(true);
    clonePhoto.src = photo;
    photosAd.append(clonePhoto);
  });
  photoAd.remove();
});

