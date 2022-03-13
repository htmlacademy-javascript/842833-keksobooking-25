const SIMILAR_AD_COUNT = 10;

const title = ['buying a property', 'property for sale', 'rental property', 'daily rental property'];
const features = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const description = ['apartment in a new building', 'with sea views', 'downtown', 'euro repair', 'within walking distance from the metro'];
const photos = ['https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg', 'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg'];
const types = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const times = ['12:00', '13:00', '14:00'];

const getInteger = (fromInteger, upToInteger) => {
  if (fromInteger < 0 || upToInteger < 0) {

    return 'невозжожно выполнить';
  }

  fromInteger = Math.floor(fromInteger);
  upToInteger = Math.floor(upToInteger);
  return Math.floor(Math.random() * (fromInteger - upToInteger + 1)) + upToInteger;
};

const getFractionalNumbers = (fromFractionalNumber, upToFractionalNumber, fraction = 1) => {
  if (fromFractionalNumber < 0 || upToFractionalNumber < 0) {

    return 'невозжожно выполнить';
  }

  fromFractionalNumber = Math.floor(fromFractionalNumber);
  upToFractionalNumber = Math.floor(upToFractionalNumber);
  return (Math.random() * (fromFractionalNumber - upToFractionalNumber + 1) + upToFractionalNumber).toFixed(fraction);
};

const getRandomArray = (element) => {
  const cloneArray = element.slice();
  cloneArray.length = getInteger(0, cloneArray.length);
  return cloneArray;
};

let number = 0;
const createAd = () => ({
  author: {
    avatar: `img/avatars/user${  number++ < 9 ? `0${  number}` : number}.png`
  },
  location: {
    lat: getFractionalNumbers(35.65000, 35.70000, 5),
    lng: getFractionalNumbers(139.70000, 139.80000, 5)
  },
  offer: {
    title: title[getInteger(0, title.length)],
    address: `${getFractionalNumbers(35.65000, 35.70000, 5)  } ${  getFractionalNumbers(139.70000, 139.80000, 5)}`,
    price: getInteger(0, 100000),
    type: types[getInteger(0, types.length)],
    rooms: getInteger(0, 50),
    guests: getInteger(0, 500),
    checkin: times[getInteger(0, times.length)],
    checkout: times[getInteger(0, times.length)],
    features: getRandomArray(features),
    description: description[getInteger(0, description.length)],
    photos: getRandomArray(photos),
  },
});

const similarAd = Array.from({
  length: SIMILAR_AD_COUNT
}, createAd);


// eslint-disable-next-line no-unused-expressions
similarAd;
