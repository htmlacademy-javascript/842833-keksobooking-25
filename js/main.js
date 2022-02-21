const getInteger = (fromInteger, upToInteger) => {
  if (fromInteger < 0 || upToInteger < 0) {

    return 'невозжожно выполнить';
  }

  fromInteger = Math.floor(fromInteger);
  upToInteger = Math.floor(upToInteger);
  return Math.floor(Math.random() * (fromInteger - upToInteger + 1)) + upToInteger;
};

getInteger(1, 200);

const getFractionalNumbers = (fromFractionalNumber, upToFractionalNumber, fraction) => {
  if (fromFractionalNumber < 0 || upToFractionalNumber < 0) {

    return 'невозжожно выполнить';
  }

  fromFractionalNumber = Math.floor(fromFractionalNumber);
  upToFractionalNumber = Math.floor(upToFractionalNumber);
  return (Math.random() * (fromFractionalNumber - upToFractionalNumber + 1) + upToFractionalNumber).toFixed (fraction);
};

getFractionalNumbers (1, 50, 2);
